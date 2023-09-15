import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import go from '../../../assets/wallet/GoFight.png'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './ScreenSize';

const GoFight =()=>{
  const navigation = useNavigation();
  return(
    <>
    <TouchableOpacity style={gofight.go} onPress={()=>navigation.navigate('Home')}>
      <Image source = {go}  style={gofight.go} />
    </TouchableOpacity>
    </>
  )
}

const gofight = StyleSheet.create({
  go:{
    position:'absolute',
    width: SCREEN_WIDTH*0.25,
    height:SCREEN_HEIGHT*0.13,
    resizeMode:'contain',
    bottom:'5%',
    right:'10%'
  }
})

export default GoFight;