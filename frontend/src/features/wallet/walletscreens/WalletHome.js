import { StyleSheet,
  Dimensions,
  Text, View, Image, 
  TouchableOpacity,
  ScrollView
 } from 'react-native';
import CardItem from '../walletcomponents/walletcards/WalletCard';
import GoFight from '../walletcomponents/GoFight';
import {Background} from '../walletcomponents/CommonStyle';
import ShinhanLogo from '../../../assets/wallet/ShinhanLogo.png';
import Exchange from '../../../assets/wallet/Exchange.png'

import { useSelector } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT= Dimensions.get("window").height;

export default function WalletHome({navigation}) {
  const {cards} = useSelector(state=>state.wallet)
  return (
    <View style={Background.background}>
      <View style={{height:SCREEN_HEIGHT*0.25}}>
        <ScrollView pagingEnabled showsHorizontalScrollIndicator={false} horizontal={true} style={{marginHorizontal:SCREEN_WIDTH*0.05}}>
          {cards&&cards.map((card, index)=>{
              return(<CardItem key={index} data={card} />)
          })}
        </ScrollView>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('MakeAccount')}>
          <Image source={ShinhanLogo} style={{width:'20%', height:'35%', resizeMode:'contain'}}></Image>
          <Text style={styles.txtSize}>예적금 만들기</Text>
          <Text style={{marginLeft:'40%'}}>></Text>
        </TouchableOpacity>  
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('ExchangeSearch')}>
          <Image source={Exchange} style={{width:'20%', height:'35%', resizeMode:'contain'}}></Image>
          <Text style={styles.txtSize}>오늘의 환율</Text>
          <Text style={{marginLeft:'40%'}}>></Text>
        </TouchableOpacity>
      </View>
      <GoFight />
    </View>
  );
}

const styles = StyleSheet.create({
  buttons:{
    marginTop:'10%',
    height:'40%',
    width: '100%',
    alignItems:'center',
    justifyContent: 'space-evenly'
  },
  button:{
    flexDirection:'row',
    height:'20%',
    width : '80%',
    backgroundColor:'white',
    borderRadius: 10,
    paddingHorizontal:'10%',
    alignItems:'center',
    justifyContent:'flex-start',
  },
  txtSize:{
    fontSize:RFPercentage(2)
  }

});