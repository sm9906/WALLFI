import React, {useEffect, useState} from "react";
import { 
  Modal,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert
 } from "react-native"
 import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../common/ScreenSize";

 const GoBack = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(()=>{
    setShowModal(true)
  })
  navigation.addListener('beforeRemove', (e) => {
    if (e.data.action.type === 'GO_BACK') {
      console.log('hdhd')
      e.preventDefault();
    }
  });

  return (
    <View>
      <Text>My Component</Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
        >
        <View style={modal.size}></View>
      </Modal>
    </View>
  );
};


const modal = StyleSheet.create({
  size:{
    height: SCREEN_HEIGHT*0.3,
    widht: SCREEN_WIDTH*0.6,
    backgroundColor:'red'
  }
})


export default GoBack