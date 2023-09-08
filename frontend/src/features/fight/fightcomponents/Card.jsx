import React from "react";
import { StyleSheet, Image } from "react-native";
import images from "../../../assets/images";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";

const Card = ({ cType, cNumber, style }) => {
  return (
    <Image
      source={images.battle[`${cType}_${cNumber}`]}
      style={[styles.image, style]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
  },
});

export default Card;
