import React from 'react';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity 
} from 'react-native';

import { images } from '../../../common/imgDict.js'
import { globalStyles } from '../homestyles/global.js';

export default function PageHeader(props) {
  return (
    <View style={{ flex: 1.2, flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity style={[globalStyles.navigationBtn, { backgroundColor: props.color }]} 
        onPress={() => props.navigation.navigate('GameHome')}>
        <Image source={images.btnSource.backHome} style={globalStyles.btnIcon}/>
      </TouchableOpacity>
      <Text style={[globalStyles.navigationText, { color: props.color }]}>{ props.title }</Text>
    </View>
  );
}