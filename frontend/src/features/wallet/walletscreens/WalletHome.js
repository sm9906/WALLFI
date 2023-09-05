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
        <Text>예적금 페이지로</Text>
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