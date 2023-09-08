import React, { useState } from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import images from "../../../assets/images";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";
import Card from "../fightcomponents/Card";

const MainBattle = () => {
  const [cardNumber, setCardNumber] = useState([1, 1, 1, 1, 1]);
  return (
    <ImageBackground source={images.background.bg_01} style={styles.bgImg}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Card style={styles.skill} cType={"skill"} cNumber={cardNumber[4]} />
          <View style={styles.semiCardContainer}>
            <View>
              <Card cType={"exchange"} cNumber={cardNumber[3]} />
              <Card cType={"counter"} cNumber={cardNumber[2]} />
            </View>
            <View>
              <Card cType={"defence"} cNumber={cardNumber[1]} />
              <Card cType={"attack"} cNumber={cardNumber[0]} />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cardContainer: {
    height: ScreenHeight * 0.5,
    width: ScreenWidth,
    flexDirection: "row",
    backgroundColor: "red",
  },
  skill: {
  },
  semiCardContainer: {
    flexDirection: "row",
  },
  bgImg: {
    height: ScreenHeight,
    width: ScreenWidth,
  },
});

export default MainBattle;
