import React from "react";
import images from "../../../common/imgDict";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";

const Card = ({ cType, cNumber, cStyle = 1, onPress }) => {
  const imageWidth = ScreenWidth * 0.2 * cStyle;
  const imageHeight = ScreenHeight * 0.159 * cStyle;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <Image
        source={images.battle[`${cType}_${cNumber}`]}
        style={{ ...styles.image, width: imageWidth, height: imageHeight }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    // backgroundColor: "yellow"
  },
});

export default Card;
