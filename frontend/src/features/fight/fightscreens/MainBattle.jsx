import React, { useEffect } from "react";
import images from "../../../common/imgDict";
import { ChangeMusic } from "../../home/homeSlice";
import GameMain from "../fightcomponents/GameMain";
import { useSelector, useDispatch } from "react-redux";
import GameHeader from "../fightcomponents/GameHeader";
import BattleFinish from "../fightcomponents/BattleFinish";
import CardContainer from "../fightcomponents/CardContainer";
import { View, StyleSheet, ImageBackground } from "react-native";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";
import Music from "../../home/homecomponents/Music";

const MainBattle = ({ route }) => {
  const isLoading = useSelector((state) => state.loading.battleLoading); // 배틀 연출동안 터치 못하게 할려고
  const endGame = useSelector((state) => state.turn.end); // 게임 종료되었는지 판단
  const randomNum = route.params?.randomNum || 2;
  const dispatch = useDispatch();
  dispatch(ChangeMusic('battle'))

  return (
    <ImageBackground source={images.background[`bg_0${randomNum}`]} style={styles.bgImg}>
      <Music props={'battle'}/>
      { isLoading && (
      <View style={styles.overlay}/> // 오버레이 설정
      )}
      {endGame ? (
        <BattleFinish/>
      ) : (
        <View style={styles.container}>
          <GameHeader />
          <GameMain />
          <CardContainer />
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImg: {
    height: ScreenHeight,
    width: ScreenWidth,
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: ScreenWidth * 0.11,
    marginBottom: ScreenHeight * 0.04,
    // backgroundColor: "blue"
  },

  battleFinish: {
    height: ScreenHeight,
    width: ScreenWidth,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default MainBattle;
