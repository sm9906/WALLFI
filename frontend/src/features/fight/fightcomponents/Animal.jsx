import React from "react";
import images from "../../../common/imgDict";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";

const Animal = ({ aType, aColor, aSize = 1, aPosition = 1, onPress }) => {
  const imageWidth = ScreenWidth * 0.2 * aSize;
  const imageHeight = ScreenHeight * 0.113 * aSize;

  console.log(aType, aColor);

  return (
    <>
      {aType && aColor ? (
        <TouchableOpacity onPress={onPress} delayPressIn={100}>
          <Image
            source={images.defaultCharacter[`${aType}`][`${aColor}`]}
            style={{
              ...styles.image,
              width: imageWidth,
              height: imageHeight,
              transform: [{ scaleX: aPosition }],
            }}
          />
        </TouchableOpacity>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    // backgroundColor: "yellow"
  },
});

export default Animal;
