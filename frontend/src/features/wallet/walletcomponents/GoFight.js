import { Image, StyleSheet } from 'react-native';

import go from '../../../assets/wallet/GoFight.png'

const GoFight =()=>{
  return(
    <>
     <Image source = {go}  style={gofight.go}>
     </Image>
    </>
  )
}

const gofight = StyleSheet.create({
  go:{
    position:'absolute',
    width:'25%',
    height:'13%',
    resizeMode:'contain',
    bottom:'5%',
    right:'10%'
  }
})

export default GoFight;