import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";
import Card from "../fightcomponents/Card";

const cardContainer = () => {
  const [cardNumber, setCardNumber] = useState([1, 1, 1, 1, 1]);
  return (
    <View style={styles.cardContainer}>
      <Card cType={"skill"} cNumber={cardNumber[4]} cStyle={2.13} />
      <View style={styles.semiCardContainer}>
        <View style={styles.semiCard}>
          <Card cType={"exchange"} cNumber={cardNumber[3]} />
          <Card cType={"defence"} cNumber={cardNumber[2]} />
        </View>
        <View style={styles.semiCard}>
          <Card cType={"counter"} cNumber={cardNumber[1]} />
          <Card cType={"attack"} cNumber={cardNumber[0]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: ScreenWidth,
    flexDirection: "row",
    gap: ScreenHeight * 0.02,
    marginBottom: ScreenHeight * 0.04,
    // backgroundColor: "red",
  },
  semiCardContainer: {
    flexDirection: "row",
    gap: ScreenHeight * 0.02,
    // backgroundColor: "black",
  },
  semiCard: {
    gap: ScreenHeight * 0.02,
  },
  bgImg: {
    height: ScreenHeight,
    width: ScreenWidth,
  },
});

export default cardContainer;
