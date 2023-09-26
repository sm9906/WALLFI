import React, { useEffect, useState } from "react";
import {
  StatusBar,
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { globalStyles } from "../homestyles/global.js";
import images from "../../../common/imgDict.js";
import GameHeader from "../homecomponents/GameHeader.js";
import PageHeader from "../homecomponents/PageHeader.js";
import Animal from "../../fight/fightcomponents/Animal.jsx";
import AccessoryList from "../homecomponents/accessory/AccessoryList.jsx";
import { useSelector } from "react-redux";
import Accessory from "../homecomponents/accessory/Accessory.jsx";
import Slider from "@react-native-community/slider";
import {
  PanGestureHandler,
  RotationGestureHandler,
} from "react-native-gesture-handler";
import { State } from "react-native-gesture-handler";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../homecomponents/ScreenSize.js";

export const AnimalDeco = ({ navigation }) => {
  const selectAnimal = useSelector((state) => state.home.pressedAnimal);
  const selectAccessory = useSelector((state) => state.home.pressedAccessory);

  const [rotationValue, setRotationValue] = useState(0);
  const [scaleValue, setScaleValue] = useState(1);

  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0); // 좌표
  const lastOffset = { x: 0, y: 0 };

  const rotate = new Animated.Value(rotationValue / 360); // 초기값 설정
  const lastRotate = { r: 0 };

  useEffect(() => {
    rotate.setValue(rotationValue / 360); // 회전
  }, [rotationValue]);

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX, // 좌표
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let newX = lastOffset.x + event.nativeEvent.translationX; // 좌표
      let newY = lastOffset.y + event.nativeEvent.translationY;

      const boundary = {
        left: -SCREEN_WIDTH * 0.23,
        right: SCREEN_WIDTH * 0.23,
        top: -SCREEN_HEIGHT * 0.23,
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
    // 회전
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
      // 회전
      lastRotate.r += event.nativeEvent.rotation;
      rotate.setOffset(lastRotate.r);
      rotate.setValue(0);
    }
  };

  return (
    <View style={globalStyles.container}>
      <ImageBackground
        source={images.Background.deco}
        style={[globalStyles.bgImg, styles.backImage]}
      >
        <GameHeader />
        <PageHeader navigation={navigation} color={"#0066FF"} title={"치장"} />
        <View style={styles.mainContent}>
          <View style={styles.select}>
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.gage}
                minimumValue={1}
                maximumValue={3}
                step={0.1}
                value={scaleValue}
                onValueChange={(value) => setScaleValue(value)} // 크기 조절
                thumbTintColor="gold"
                minimumTrackTintColor="#00FF00"
                maximumTrackTintColor="#0000FF"
              />
            </View>
            <View style={styles.gap}></View>
            <View style={styles.selectBack}>
              <Animal
                aType={selectAnimal ? selectAnimal.characterType : null}
                aColor={selectAnimal ? selectAnimal.color : null}
                aSize={2}
              />
              <PanGestureHandler
                onGestureEvent={onGestureEvent}
                onHandlerStateChange={onHandlerStateChange}
              >
                <Animated.View
                  style={[
                    {
                      transform: [
                        { translateX: translateX },
                        { translateY: translateY },
                      ],
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
                                outputRange: ["360deg", "0deg"],
                              }),
                            },
                          ],
                        },
                      ]}
                    >
                      <View style={styles.accessoryOverlay}>
                        <Accessory
                          aType={selectAccessory ? selectAccessory : null}
                          aSize={scaleValue}
                          rotationValue={rotationValue}
                        />
                      </View>
                    </Animated.View>
                  </RotationGestureHandler>
                </Animated.View>
              </PanGestureHandler>
            </View>
            <View style={styles.gap}></View>
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.gage}
                minimumValue={0}
                maximumValue={360}
                step={1}
                value={rotationValue}
                onValueChange={(value) => setRotationValue(value)} // 회전 조절
                thumbTintColor="gold"
                minimumTrackTintColor="#00FF00"
                maximumTrackTintColor="#0000FF"
              />
            </View>
          </View>
          <AccessoryList />
          <View style={styles.confirm}>
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => navigation.navigate("")}
            >
              <Text style={styles.confirmText}>확정</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  backImage: {
    // alignItems: "center",
  },
  mainContent: {
    flex: 7,
    // backgroundColor: "red",
  },
  select: {
    flexDirection: "row",
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "gold",
  },
  sliderContainer: {
    width: "10%",
    height: "90%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "gold"
  },
  gage: {
    width: "600%",
    height: "100%",
    transform: [{ rotate: "-90deg" }],
    // backgroundColor:"red",
  },
  gap: {
    width: "3%",
  },
  selectBack: {
    width: "60%",
    height: "90%",
    // flex: 0.9,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    // backgroundColor: "gold",
  },
  accessoryOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  confirm: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "purple",
  },
  confirmBtn: {
    width: "70%",
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  confirmText: {
    color: "#0066FF",
    fontWeight: "bold",
    fontSize: 35,
  },
});

export default AnimalDeco;
