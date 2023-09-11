import React from "react";
import { View, StyleSheet } from "react-native";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";

const HpBar = ({hP}) => {
    const HpHeight = ScreenHeight * 0.18 * hP / 100
  return (
          <View style={{ ...styles.HpBar, height: HpHeight }}></View>
          );
};

const styles = StyleSheet.create({
  HpBar: {
    height: ScreenHeight * 0.18,
    width: ScreenWidth * 0.16,
    marginTop: ScreenHeight * 0.007,
    borderRadius: 5,
    backgroundColor: "#36FF04",
  },
});

export default HpBar;
