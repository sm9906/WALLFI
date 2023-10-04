import React from "react";
import images from "../../../../common/imgDict";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../ScreenSize";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

const Accessory = ({
  aType,
  aSize = 1,
  aPosition = 1,
  rotation = 0,
  onPress,
  aAbosulte = "relative",
  aMain = false,
  aCollection = false,
  aBattle = false,
  aXY,
}) => {
  const imageWidth = SCREEN_WIDTH * 0.2 * aSize;
  const imageHeight = SCREEN_HEIGHT * 0.113 * aSize;

  let dynamicLeft, dynamicRight, dynamicTop, dynamicBottom;

  if (aMain) {
    dynamicLeft = -imageWidth * 0.5 + aXY[0];
    dynamicRight = imageWidth * 0.5;
    dynamicTop = -imageHeight * 0.5 - SCREEN_HEIGHT * 0.113 + aXY[1];
    dynamicBottom = imageHeight * 0.5 - SCREEN_HEIGHT * 0.113;
  } else if (aCollection) {
    dynamicLeft = -imageWidth * 0.5 + aXY[0] * 0.6;
    dynamicRight = imageWidth * 0.5;
    dynamicTop = -imageHeight * 0.5 - SCREEN_HEIGHT * 0.113 * 0.6 + aXY[1] * 0.6;
    dynamicBottom = imageHeight * 0.5 - SCREEN_HEIGHT * 0.113 * 0.6;
  } else if (aBattle) {
    dynamicLeft = imageWidth * 1 - aXY[0] * 0;
    dynamicRight = -imageWidth * 1;
    dynamicTop = -imageHeight * 1 - SCREEN_HEIGHT * 0.113 * 0 + aXY[1] * 0;
    dynamicBottom = imageHeight * 1 - SCREEN_HEIGHT * 0.113 * 0;
  } else {
    dynamicLeft = 0;
    dynamicRight = 0;
    dynamicTop = 0;
    dynamicBottom = 0;
  }

console.log(aXY)

  return (
    <TouchableOpacity onPress={onPress} delayPressIn={100}>
      <Image
        source={images.accessory[`${aType}`]}
        style={{
          ...styles.image,
          width: imageWidth,
          height: imageHeight,
          transform: [{ scaleX: aPosition }, { rotate: `-${rotation}deg` }],
          position: aAbosulte,
          bottom: dynamicBottom,
          left: dynamicLeft,
          top: dynamicTop,
          right: dynamicRight,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    // backgroundColor: "blue"
  },
});

export default React.memo(Accessory);
