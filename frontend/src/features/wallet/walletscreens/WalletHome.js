import { StatusBar } from 'expo-status-bar';
import { StyleSheet,
  Dimensions,
  Text, View, Button, 
  TouchableOpacity } from 'react-native';
import CardItem from '../walletcomponents/WalletCard'

// const SCREEN_WIDTH = Dimensions.get("window").width;
// const SCREEN_HEIGHT= Dimensions.get("window").height;


export default function WalletHome({navigation}) {
  return (
    <View style={styles.container}>
      <CardItem />
      <View>
        <TouchableOpacity onPress={()=>navigation.navigate('MakeAccount')}>
          <Text>예적금 만들기</Text>
        </TouchableOpacity>  
        <TouchableOpacity onPress={()=>navigation.navigate('ExchangeSearch')}>
          <Text>오늘의 환율</Text>
        </TouchableOpacity>
      </View>
      <View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});