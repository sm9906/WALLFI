import React, { useEffect } from "react";
import { Animated } from "react-native";
import {
  PanGestureHandler,
  RotationGestureHandler,
  State,
} from "react-native-gesture-handler";
import images from "../../../../common/imgDict";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../ScreenSize";

const Accessory = ({
  aType,
  aSize = 1,
  aPosition = 1,
  onPress,
  rotationValue = 0,
}) => {

  const imageWidth = SCREEN_WIDTH * 0.2 * aSize;
  const imageHeight = SCREEN_HEIGHT * 0.113 * aSize;

  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);
  const lastOffset = { x: 0, y: 0 };

  const rotate = new Animated.Value(0);
  const lastRotate = { r: 0 };

  useEffect(() => {
    rotate.setValue(rotationValue);
  }, [rotationValue]);

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let newX = lastOffset.x + event.nativeEvent.translationX;
      let newY = lastOffset.y + event.nativeEvent.translationY;

      const boundary = {
        left: -SCREEN_WIDTH * 0.23,
        right: SCREEN_WIDTH * 0.23,
        top: -SCREEN_HEIGHT * 0.13,
        bottom: SCREEN_HEIGHT * 0.13,
      };

      if (newX < boundary.left) newX = boundary.left;
      if (newX > boundary.right) newX = boundary.right;
      if (newY < boundary.top) newY = boundary.top;
      if (newY > boundary.bottom) newY = boundary.bottom;

      lastOffset.x = newX;
      lastOffset.y = newY;

      translateX.setOffset(lastOffset.x);
      translateX.setValue(0);
      translateY.setOffset(lastOffset.y);
      translateY.setValue(0);
    }
  };

  const onRotateGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          rotation: rotate,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const onRotateHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastRotate.r += event.nativeEvent.rotation;
      rotate.setOffset(lastRotate.r);
      rotate.setValue(0);
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={[
          {
            transform: [{ translateX: translateX }, { translateY: translateY }],
          },
        ]}
      >
        <RotationGestureHandler
          onGestureEvent={onRotateGestureEvent}
          onHandlerStateChange={onRotateHandlerStateChange}
        >
          <Animated.View
            style={[
              {
                transform: [
                  {
                    rotate: rotate.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "360deg"],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity onPress={onPress} delayPressIn={100}>
              <Image
                source={images.accessory[`${aType}`]}
                style={{
                  ...styles.image,
                  width: imageWidth,
                  height: imageHeight,
                  transform: [{ scaleX: aPosition }],
                }}
              />
            </TouchableOpacity>
          </Animated.View>
        </RotationGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
  },
});

export default React.memo(Accessory);
