import React from "react";
import images from "../../../assets/images";
import { StyleSheet, Image } from "react-native";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";

const Animal = ({ aType, aSize = 1, aPosition = 1 }) => {
  const imageWidth = ScreenWidth * 0.2 * aSize;
  const imageHeight = ScreenHeight * 0.113 * aSize;

  return (
    <Image
      source={images.animal[`baby_${aType}`]}
      style={{ ...styles.image, width: imageWidth, height: imageHeight, transform: [{ scaleX: aPosition }] }}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    // backgroundColor: "yellow"
  },
});

export default Animal;
