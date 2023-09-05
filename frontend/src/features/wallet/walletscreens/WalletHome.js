import { StatusBar } from 'expo-status-bar';
import { StyleSheet,
  Dimensions,
  Text, View, Image, 
  TouchableOpacity } from 'react-native';
import CardItem from '../walletcomponents/walletcards/WalletCard';

import SinhanLogo from '../../../assets/wallet/SinhanLogo.png';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT= Dimensions.get("window").height;


export default function WalletHome({navigation}) {

  return (
    <View style={styles.container}>
      <CardItem />
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('MakeAccount')}>
          <Image source={SinhanLogo} style={{width:'20%', height:'35%', resizeMode:'contain'}}></Image>
          <Text>예적금 만들기</Text>
          <Text style={{marginLeft:'40%'}}>></Text>
        </TouchableOpacity>  
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('ExchangeSearch')}>
          <Text>오늘의 환율</Text>
          <Text>></Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>GoFight</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#F3F6FB',
  },
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
  }

});