import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default function ButtonGroup(props) {

  // 현재 누른 버튼에 대한 배경 색 스타일 코드
  const color = (bool) => {
    return props.selectedBtn === bool ? 'white' : '#5C9DFF';
  }

  return (
    <View style={styles.btnGroup}>
      <TouchableOpacity style={[styles.btnBox, { borderRightColor: 'white', borderRightWidth: 2 }]} onPress={() => props.setSelectedBtn(false)}>
        <Text style={[styles.textStyle, { color: color(false) }]}>{props.title1}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btnBox, { borderLeftColor: 'white', borderLeftWidth: 2 }]} onPress={() => props.setSelectedBtn(true)}>
        <Text style={[styles.textStyle, { color: color(true) }]}>{props.title2}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  btnGroup: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginHorizontal: '20%'
  },
  btnBox: {
    flex: 1,
    height: '50%',
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  }
})