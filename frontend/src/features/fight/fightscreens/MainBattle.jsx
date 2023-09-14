import React from "react";
import { useSelector } from "react-redux";
import images from "../../../assets/images";
import GameMain from "../fightcomponents/GameMain";
import GameHeader from "../fightcomponents/GameHeader";
import BattleFinish from "../fightcomponents/BattleFinish";
import CardContainer from "../fightcomponents/CardContainer";
import { View, StyleSheet, ImageBackground } from "react-native";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";

const MainBattle = ({ route }) => {
  const isLoading = useSelector((state) => state.loadingReducer.battleLoading);
  const endGame = useSelector((state) => state.turnReducer.end);
  const randomNum = route.params?.randomNum || 2;
  return (
    <ImageBackground source={images.background[`bg_0${randomNum}`]} style={styles.bgImg}>
      {/* { isLoading && (
      <View style={styles.overlay}/> // 오버레이 설정
      )} */}
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
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: ScreenWidth * 0.11,
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
