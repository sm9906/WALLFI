import React, { useEffect, useState, useMemo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateCharacter } from '../homeSlice.js';
import { globalStyles } from '../homestyles/global.js';
import { images } from '../../../common/imgDict.js';
import GameHeader from '../homecomponents/GameHeader.js';
import background from '../../../assets/background/home.png'
import { useFocusEffect } from '@react-navigation/native';
import { getMainCharacter } from '../homeSlice.js';


// 상태바 겹침현상을 없애려면 react-native에서 StatusBar를 import 해줘야함

export default function GameHome({ navigation }) {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const userId = useSelector(state=>state.auth.userId);
  
  useFocusEffect(()=>{
    dispatch(getMainCharacter(userId))
  })
//   console.log(images.background.home)
  return (
    <View style={globalStyles.container}>
      <ImageBackground source={background} style={globalStyles.bgImg}>
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalBackground}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseBtn}>
              <Image source={images.btnSource.modalClose} style={{ resizeMode: 'contain', width: '10%', height: '50%' }} />
            </TouchableOpacity>
            <View style={{
              flex: 10.5,
              width: '100%',
              backgroundColor: '#FFF5EA',
            }}>
              <Text style={{ flex: 1, marginTop: '5%', fontSize: 35, alignSelf: 'center', color: '#293694', fontWeight: 'bold' }}>&lt;공지&gt;</Text>
              <View style={{ flex: 1, alignItems: 'flex-start', marginStart: '5%', marginTop: '7%' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>서버 점검 및 업데이트 공지</Text>
              </View>
              <View style={{ flex: 1.5, alignItems: 'flex-start', marginStart: '5%' }}>
                <Text style={{ fontSize: 16, color: 'red', marginBottom: '3%' }}>{'점검 시간: 9월 18일 11:00 ~ 13:00\n대상 서버: 전체 서버'}</Text>
              </View>
              <View style={{ flex: 4, alignItems: 'flex-start', marginStart: '5%' }}>
                <Text style={{ fontSize: 12, marginBottom: '3%' }}>{'서버 점검 10분전에 데이터 보호를 위해 미리 게임을\n종료하시기 바랍니다.'}</Text>
                <Text style={{ fontSize: 12 }}>
                  {'코인 용사님들의 더 풍부한 모험을 위해 새로운 컨텐츠를\n추가하였습니다. 해당 업데이트 내용은 아래와 같이\n참고하시기 바랍니다. 항상 코인 용사님들이 새로운 모험을\n'}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
        </Modal>
        <GameHeader />
        <Season />
        <Content navigation={navigation}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <Bottom navigation={navigation} />
      </ImageBackground>
      <StatusBar />

    </View>
  )
}

function Season() {

  return (
    <View style={styles.season}>
      <LinearGradient style={styles.box} colors={['rgba(142, 170, 245, 1)', 'rgba(72, 122, 255, 0.4)', 'transparent']}>
        <Image source={images.gameIcon.trophy} style={styles.trophy} />
        <Text style={styles.seasonText}>1 시즌</Text>
      </LinearGradient>
    </View>
  )
}

function Content(props) {

  const dispatch = useDispatch();

  const userInfo = useSelector(state => state.home.userGameInfo);
  const mainCharacter = useSelector(state => state.home.mainCharacter);

  // 메인캐릭터, 칭호
  const [imageUrl, setImageUrl] = useState('');
  const [userName, setUserName] = useState('');
  let img;

  // 먹이
  const [isTimerRunning_1, setIsTimerRunning_1] = useState(false);
  const [isButtonDisabled_1, setIsButtonDisabled_1] = useState(false);
  const [lastButtonClickTime_1, setLastButtonClickTime_1] = useState(null);

  // 훈련
  const [timeText, setTimeText] = useState(null);
  const [isTimerRunning_2, setIsTimerRunning_2] = useState(false);
  const [isButtonDisabled_2, setIsButtonDisabled_2] = useState(false);
  const [lastButtonClickTime_2, setLastButtonClickTime_2] = useState(null);

  useEffect(() => {
    if (userInfo) {
      const userStatus = userInfo.status;
      const type = mainCharacter.characterType;
      const color = mainCharacter.color;
      const image = images.defaultCharacter[type][color];
      img = image;

      setUserName(userStatus);
      setImageUrl(image);
    }
  })

  function changeImage() {
    const currentTime = new Date().getTime();

    if (isTimerRunning_1) {
      Alert.alert(
        '경고',
        '밥 먹는 중입니다.',
        [
          { text: '확인', onPress: () => { }, style: 'default' }
        ]
      );
      return;
    }

    if (isTimerRunning_2) {
      Alert.alert(
        '경고',
        '훈련중입니다.',
        [
          { text: '확인', onPress: () => { }, style: 'default' }
        ]
      );
      return;
    }

    if (isTimerRunning_1 === false && isButtonDisabled_1) {
      Alert.alert(
        '경고',
        '4시간 동안은 밥을 다시 줄 수 없습니다.',
        [
          { text: '확인', onPress: () => { }, style: 'default' }
        ]
      );
      return;
    }

    setLastButtonClickTime_1(currentTime);
    setIsButtonDisabled_1(true);

    setTimeout(() => {
      setIsButtonDisabled_1(false);
      setLastButtonClickTime_1(null);
    }, 3000);



    setImageUrl(images.eatCharacter[mainCharacter.characterType]);
    setIsTimerRunning_1(true);
  }

  function train() {
    const currentTime = new Date().getTime();

    if (isTimerRunning_1) {
      Alert.alert(
        '경고',
        '밥 먹는 중입니다.',
        [
          { text: '확인', onPress: () => { }, style: 'default' }
        ]
      );
      return;
    }

    if (isTimerRunning_2) {
      Alert.alert(
        '경고',
        '훈련중입니다.',
        [
          { text: '확인', onPress: () => { }, style: 'default' }
        ]
      );
      return;
    }

    if (isTimerRunning_2 === false && isButtonDisabled_2) {
      Alert.alert(
        '경고',
        '4시간 동안은 다시 훈련할 수 없습니다.',
        [
          { text: '확인', onPress: () => { }, style: 'default' }
        ]
      );
      return;
    }

    setLastButtonClickTime_2(currentTime);
    setIsButtonDisabled_2(true);

    setTimeout(() => {
      setIsButtonDisabled_2(false);
      setLastButtonClickTime_2(null);
    }, 4 * 60 * 60 * 1000);

    setTimeText('훈련중..');
    setIsTimerRunning_2(true);

  }

  useEffect(() => {
    let timer;
    console.log('렌더링1');
    if (isTimerRunning_1) {
      console.log('렌더링2');
      timer = setTimeout(() => {
        setImageUrl(img);
        setIsTimerRunning_1(false);
        dispatch(updateCharacter({ act: '밥먹기', characterIdx: mainCharacter.characterIdx, statusType: 'atk', userId: 'ssafy', value: 1 })).then(res => console.log(res));
        console.log('밥주기완료', mainCharacter);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [isTimerRunning_1]);

  useEffect(() => {
    let timer;
    console.log('렌더링3');
    if (isTimerRunning_2) {
      console.log('렌더링4');
      timer = setTimeout(() => {
        setTimeText(null);
        setIsTimerRunning_2(false);
        dispatch(updateCharacter({ act: '훈련하기', characterIdx: mainCharacter.characterIdx, statusType: 'def', userId: 'ssafy', value: 1 }));
        console.log('훈련완료', mainCharacter);
      }, 60 * 1000);
    }

    return () => clearTimeout(timer);
  }, [isTimerRunning_2]);

  return (
    <View style={styles.content}>
      <View style={styles.sideBar}>
        <TouchableOpacity style={styles.button} onPress={() => {
          props.navigation.navigate('Collection');
        }}>
          <Image source={images.btnSource.collection} style={styles.buttonContent} />
          <Text style={styles.btnText}>동물도감</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={changeImage}>
          <Image source={images.btnSource.eat} style={styles.buttonContent} />
          <Text style={styles.btnText}>밥 주기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={train}>
          <Image source={images.btnSource.training} style={styles.buttonContent} />
          <Text style={styles.btnText}>훈련</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <Image source={imageUrl}
          style={{ width: '100%', height: '50%', resizeMode: 'contain' }}
        />
        <Text style={{
          color: '#3B3B3B',
          fontWeight: 'bold',
          fontSize: 25,
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.setModalVisible(true)}
        >
          <Image source={images.btnSource.notice} style={styles.buttonContent} />
          <Text style={styles.btnText}>공지</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Mission')}>
          <Image source={images.btnSource.mission} style={styles.buttonContent} />
          <Text style={styles.btnText}>미션</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Mission')}>
          <Image source={images.btnSource.map} style={styles.buttonContent} />
          <Text style={styles.btnText}>지도</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

function Bottom(props) {

  return (
    <View style={styles.bottom}>
      <TouchableOpacity style={styles.bottomBtn} onPress={() => props.navigation.navigate('Mission')}>
        <Image source={images.btnSource.wallet} style={styles.buttonContent} />
        <Text style={styles.btnText}>지갑으로</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomCenterBtn} onPress={() => props.navigation.navigate('GoogleMap')}>
        <Image source={images.btnSource.battle} style={styles.challengeBtn} />
        <Text style={styles.btnText}>일일도전</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomBtn} onPress={() => { props.navigation.navigate('Market') }}>
        <Image source={images.btnSource.market} style={styles.buttonContent} />
        <Text style={styles.btnText}>상점</Text>
      </TouchableOpacity>
    </View>
  )
}


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
    color: '#E3B75A',
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
    marginEnd: '5%'
  }
})