import React from "react";
import images from "../../../../common/imgDict";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../ScreenSize"

const Accessory = ({ aType, aSize = 1, aPosition = 1, onPress }) => {
  const imageWidth = SCREEN_WIDTH * 0.2 * aSize;
  const imageHeight = SCREEN_HEIGHT * 0.113 * aSize;

  return (
    <TouchableOpacity onPress={onPress} delayPressIn={100}>
      <Image
        source={images.accessory[`${aType}`]}
        style={{ ...styles.image, width: imageWidth, height: imageHeight, transform: [{ scaleX: aPosition }] }}
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

export default Accessory;
