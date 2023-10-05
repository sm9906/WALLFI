import React, {useState, useEffect} from 'react';
import {  
  View, 
  Image, 
  TouchableOpacity,
  StyleSheet 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Audio } from 'expo-av';
import { DJ, PlayMusic, StopMusic, DeleteMusic } from '../homeSlice.js';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../common/ScreenSize.js';
import { images } from '../../../common/imgDict.js';


let turnOn = true;

const Music = React.memo(() => {
  const dispatch = useDispatch();
  const [on, setON] = useState(turnOn);
  const music = useSelector(state => state.home.music);
  const state = useSelector(state=>state.home.now)

  useEffect(()=>{
    DJselect();
  },[state])

  useEffect(()=>{
    setON(turnOn)
  },[turnOn])

  const DJselect = async () => {
    if(state==='home'){
      const { sound } = await Audio.Sound.createAsync(
        require('../../../assets/music/GameHome.mp3')  
      );
      await dispatch(DJ(sound));
    }else if(state==='battle'){
      const {sound} = await Audio.Sound.createAsync(
        require('../../../assets/music/Fight.mp3')
      )
      await dispatch(DJ(sound));
    }else{
      await dispatch(DeleteMusic());
    }
  }

  useEffect(() => {
    if (music) {
      on ? dispatch(PlayMusic()) : dispatch(StopMusic());
    }
  }, [on, music]);

  return (
    <View style={musicStyles.musicContainer}>
      {music && <TouchableOpacity onPress={() => { setON(!on); turnOn=!on }}>
        <Image source={on ? images.gameIcon.musicon : images.gameIcon.musicoff} style={musicStyles.music} />
      </TouchableOpacity>
      }
    </View>
  )
})


const musicStyles = StyleSheet.create({
  musicContainer:{
    marginLeft: SCREEN_WIDTH * 0.03,
    marginTop: SCREEN_HEIGHT *0.13,
    height: SCREEN_HEIGHT * 0.07,
    width: SCREEN_WIDTH * 0.07,
    position: "absolute",
  },
  music: {
    resizeMode: 'contain',
    height: SCREEN_HEIGHT * 0.07,
    width: SCREEN_WIDTH * 0.07,
  },
});


export default Music;