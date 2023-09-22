import React, { useEffect, useState } from 'react';
import { 
  StatusBar, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ImageBackground, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { getMainCharacter, updateCharacter } from '../homeSlice.js';
import { globalStyles } from '../homestyles/global.js';
import { images } from '../../../common/imgDict.js';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../common/ScreenSize.js';

import { Audio } from 'expo-av';
import { DJMing, PlayMusic, StopMusic } from '../homeSlice.js';

import GameHeader from '../homecomponents/GameHeader.js';

// 상태바 겹침현상을 없애려면 react-native에서 StatusBar를 import 해줘야함

export default function GameHome({ navigation }) {
  const dispatch = useDispatch(); 
  // 이거 뒤로가기 버튼? 훅으로 따로 뺄거임  
  useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
      if(e.data.action.type==='GO_BACK'){
        e.preventDefault();
        Alert.alert('','지갑으로 돌아가시겠습니까?',[{
          text:'머무르기',
          onPress: () => {}
        },
        {text:'지갑으로', onPress:()=>navigation.navigate('Wallet')}
    ])
      }
    }),[navigation]
  );

  const userId = useSelector(state=>state.auth.userId);
  
  useFocusEffect(()=>{
    dispatch(getMainCharacter(userId));
  })
  return (
    <View style={globalStyles.container}>
      <ImageBackground source={images.Background.home} style={globalStyles.bgImg}>
        <GameHeader/>
        <Music/>
        <Season />
        <Content navigation={navigation}
          userId={userId}
        />
        <Bottom navigation={navigation} />
      </ImageBackground>
      <StatusBar />

    </View>
  )
}


const Music = React.memo(()=>{
  const dispatch = useDispatch();
  const [on, setON]= useState(true);
  const music = useSelector(state=>state.home.music);
  
  if(music){
    on?dispatch(PlayMusic()):dispatch(StopMusic());
  }

  useEffect(()=>{
    DJselect();
  },[]);
  
  const DJselect = async() => {
    if(!music){
      const {sound} = await Audio.Sound.createAsync(
        require('../../../assets/music/GameHome.mp3')
      );
      await dispatch(DJMing(sound));
    }
  }

  return(        
    <View>
      {music&&<TouchableOpacity onPress={()=>{
        setON(!on)}}>
        <Image source={on?images.gameIcon.musicon:images.gameIcon.musicoff} style={musicStyles.music}/>
      </TouchableOpacity>
      }
    </View>
  )
})


const musicStyles = StyleSheet.create({
  music: {
    resizeMode:'contain',
    marginLeft: SCREEN_WIDTH * 0.03,
    height: SCREEN_HEIGHT * 0.07,
    width: SCREEN_WIDTH * 0.07,
    position: "absolute",
  },
});

function Season() {

  return (
    <View style={styles.season}>
      <LinearGradient style={styles.box} colors={['rgba(142, 170, 245, 1)', 'rgba(72, 122, 255, 0.5)', 'transparent']}>
        <Image source={images.gameIcon.trophy} style={styles.trophy} />
        <Text style={styles.seasonText}>여름 시즌</Text>
      </LinearGradient>
    </View>
  )
}

const action = {
  '밥먹기':'밥 먹는 중...',
  '훈련하기':'훈련 중...',
  'rest':'휴식 중...'
}

const ACT_TIME = 5000;

function Content(props) {
  const mainCharacter = useSelector(state=>state.home.mainCharacter)
  const dispatch = useDispatch();
  const {status:userName} = useSelector(state => state.home.userGameInfo);
  // 메인캐릭터, 칭호;
  const [nowAct, setNowAct] = useState();
  const timeText = action[nowAct]

  const type = mainCharacter.characterType;
  const color = mainCharacter.color;
  const imageUrl = images.defaultCharacter[type][color];
  // 훈련

  useEffect(()=>{
    if(nowAct){
      setTimeout(()=>{
        setNowAct(nowAct==='rest'?null:'rest')
      },ACT_TIME)
    }
  },[nowAct])


  // 행동 중 

  const changeAct = async(action) => {
    if(!nowAct){
      dispatch(updateCharacter({
        act: action,
        characterIdx: mainCharacter.characterIdx,
        statusType: action==='밥먹기'?"atk":"def",
        userId: props.userId,
        value: 1
        }))
      setNowAct(action)
    }else{
      alertAct()
    }
  }
  const alertAct = () => {
    let message;
    if(nowAct==='밥먹기'){
      message='밥 먹는 중입니다';
    }else if(nowAct==='훈련하기'){
      message='훈련 중입니다';
    }else{
      message=`훈련이나 밥먹기가 완료된 후 ${ACT_TIME/(1000)}초 동안은 쉬어야 합니다`;
    }
                                         
    Alert.alert(
      '경고',
      message,
      [
        {text:'확인', onPress: ()=> {}, style:'default'}
      ]
    );
    return;
  }

  return (
    <View style={styles.content}>
      <View style={styles.sideBar}>
        <TouchableOpacity style={styles.button} onPress={() => {
          props.navigation.navigate('Collection');
        }}>
          <Image source={images.btnSource.collection} style={styles.buttonContent} />
          <Text style={styles.btnText}>동물도감</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>changeAct('밥먹기')}>
          <Image source={images.btnSource.eat} style={styles.buttonContent} />
          <Text style={styles.btnText}>밥 주기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>changeAct('훈련하기')}>
          <Image source={images.btnSource.training} style={styles.buttonContent} />
          <Text style={styles.btnText}>훈련</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        {nowAct!=='밥먹기'&&nowAct!=='훈련하기'&&<Image source={imageUrl}
          style={{ width: '100%', height: '50%', resizeMode: 'contain' }}
        />}
        {nowAct==='밥먹기'&&<Image source={images.eatCharacter[type]} style={actStyles.eating}/>}
        {nowAct==='훈련하기'&&<Image source={require('../../../assets/game/loading/LoadingImg.gif')} style={actStyles.eating}/>}
        <Text style={{
          color: '#3B3B3B',
          fontWeight: 'bold',
          fontSize: RFPercentage(2),
          margin: '5%',
        }}>&lt;{userName}&gt;</Text>
        <Text style={{
          color: 'white',
          fontSize: 18,
          fontWeight: 'bold',
          textShadowColor: 'black',
          textShadowRadius: 2,
          textShadowOffset: { width: 1, height: 2 },
          elevation: 2,
        }}>{timeText}</Text>
      </View>
      <View style={styles.sideBar}>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('ItemExchange')}>
          <Image source={images.btnSource.handshake} style={styles.buttonContent} />
          <Text style={styles.btnText}>거래소</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Mission')}>
          <Image source={images.btnSource.mission} style={styles.buttonContent} />
          <Text style={styles.btnText}>미션</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>

          <Image source={images.btnSource.sunglasses} style={styles.buttonContent} />
          <Text style={styles.btnText}>꾸미기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

function Bottom(props) {

  return (
    <View style={styles.bottom}>
      <TouchableOpacity style={styles.bottomBtn} onPress={() => props.navigation.navigate('Wallet')}>
        <Image source={images.btnSource.wallet} style={styles.buttonContent} />
        <Text style={styles.btnText}>지갑으로</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomCenterBtn} onPress={() => props.navigation.navigate('GoogleMap')}>
        <Image source={images.btnSource.battle} style={styles.challengeBtn} />
        <Text style={styles.btnText}>배틀</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomBtn} onPress={() => { props.navigation.navigate('Market') }}>
        <Image source={images.btnSource.market} style={styles.buttonContent} />
        <Text style={styles.btnText}>상점</Text>
      </TouchableOpacity>
    </View>
  )
}

const actStyles = StyleSheet.create({
  eating:{
    resizeMode: 'contain',
    marginLeft:'8%',
    width: SCREEN_WIDTH*0.9,
    height: '50%',
  }
})

const styles = StyleSheet.create({
  season: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  box: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 10,
  },
  trophy: {
    flex: 1,
    height: '80%',
    resizeMode: 'contain',
  },
  seasonText: {
    flex: 1.3,
    height: '50%',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: '#0046FF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textAlign: 'center',
    alignSelf: 'center',

  },
  content: {
    flex: 5,
    flexDirection: 'row',
  },
  main: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideBar: {
    flex: 1,
    flexDirection: 'column',
    width: '20%',
    height: '80%',
    marginTop: '10%',
    marginStart: '1%',
    marginEnd: '1%',
    padding: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(65, 66, 69, 0.55)',
    borderRadius: 10,
    borderColor: 'rgba(131, 131, 131, 0.55)',
    borderWidth: 3,
    width: '100%',
    height: '21%',
    margin: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonContent: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  bottom: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBtn: {
    backgroundColor: '#6B6F89',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.56)',
    borderWidth: 2,
    flex: 1,
    width: '100%',
    height: '60%',
    margin: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomCenterBtn: {
    width: '100%',
    height: '70%',
    backgroundColor: 'rgba(251, 192, 40, 1)',
    borderRadius: 10,
    borderColor: 'rgba(167, 142, 78, 1)',
    borderWidth: 2,
    flex: 2,
    margin: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  challengeBtn: {
    width: '100%',
    height: '55%',
    resizeMode: 'contain',
  },
  btnText: {
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 3,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(50, 68, 143, 0.95)',
    width: '90%',
    marginHorizontal: '5%',
    marginVertical: '30%',
    borderRadius: 20,
  },
  modalCloseBtn: {
    flex: 1.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginEnd: '5%',
  },
})