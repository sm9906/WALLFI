import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";
import Card from "../fightcomponents/Card";

const GameHeader = () => {
  return (
    <View style={styles.gameHeader}>
      <View style={styles.time}>
        <Card cType={"time"} cNumber={0} cStyle={0.25} />
        <Text style={styles.timeText}>17</Text>
      </View>
      <Card cType={"question"} cNumber={0} cStyle={0.4} />
    </View>
  );
};

const styles = StyleSheet.create({
  gameHeader: {
    flexDirection: "row",
    width: ScreenWidth,
    marginTop: ScreenHeight * 0.05,
    justifyContent: "center",
    gap: ScreenWidth * 0.02,
    // backgroundColor: "purple",
  },
  time: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: ScreenWidth * 0.02,
    width: ScreenWidth * 0.2,
    marginRight: ScreenWidth * 0.24,
    marginLeft: ScreenWidth * 0.24,
    borderRadius: 10,
    backgroundColor: "#FFA800",
  },
  timeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default GameHeader;
