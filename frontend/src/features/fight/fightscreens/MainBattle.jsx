import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import images from "../../../assets/images";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";
import GameHeader from "../fightcomponents/GameHeader";
import GameMain from "../fightcomponents/GameMain";
import CardContainer from "../fightcomponents/CardContainer";

const MainBattle = () => {
  return (
    <ImageBackground source={images.background.bg_06} style={styles.bgImg}>
      <View style={styles.container}>
        <GameHeader />
        <GameMain />
        <CardContainer />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImg: {
    height: ScreenHeight,
    width: ScreenWidth,
  },

  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: ScreenWidth * 0.11,
    // backgroundColor: "blue"
  },
});

export default MainBattle;
