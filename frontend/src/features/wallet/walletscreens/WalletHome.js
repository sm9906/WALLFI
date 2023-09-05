import { StatusBar } from 'expo-status-bar';
import { StyleSheet,
  Text, View, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function WalletHome({navigation}) {
  return (
    <View>
      <Text>
        홈
      </Text>
      <TouchableOpacity onPress={()=>navigation.navigate('MakeAccount')}>
        <Text>예적금 만들기</Text>
      </TouchableOpacity>  
      <TouchableOpacity onPress={()=>navigation.navigate('ExchangeSearch')}>
        <Text>오늘의 환율</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});