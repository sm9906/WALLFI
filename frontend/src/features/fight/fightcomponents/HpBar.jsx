import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated } from "react-native";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";

const HpBar = ({ hP, maxHp }) => {
  const hpValue = useRef(new Animated.Value(hP)).current;

  useEffect(() => {
    Animated.timing(hpValue, {
      duration: 1500,
      toValue: hP,
      useNativeDriver: false
    }).start();
  }, [hP]);

  const HpHeight = ScreenHeight * 0.18 * hP / maxHp;

  const colorAnimation = hpValue.interpolate({
    inputRange: [0, maxHp * 0.25, maxHp * 0.5, maxHp * 0.75, maxHp],
    outputRange: [
      "#FF4F1F",
      "#DE9A3A",
      "#F5DD4C",
      "#9FDE3A",
      "#34FA62",
    ]
  });

  return (
    <Animated.View style={{ ...styles.HpBar, height: HpHeight, backgroundColor: colorAnimation }}></Animated.View>
  );
};

const styles = StyleSheet.create({
  HpBar: {
    width: ScreenWidth * 0.16,
    marginTop: ScreenHeight * 0.007,
    borderRadius: 5
  }
});

export default HpBar;