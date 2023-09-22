import React, { useState } from "react";
import {
  StatusBar,
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../homestyles/global.js";
import images from "../../../common/imgDict.js";
import GameHeader from "../homecomponents/GameHeader.js";
import PageHeader from "../homecomponents/PageHeader.js";
import Animal from "../../fight/fightcomponents/Animal.jsx";
import AccessoryList from "../homecomponents/accessory/AccessoryList.jsx";
import { useSelector } from "react-redux";

export const AnimalDeco = ({ navigation }) => {

  const selectAnimal = useSelector((state) => state.home.pressedAnimal)

  return (
    <View style={globalStyles.container}>
      <ImageBackground
        source={images.Background.deco}
        style={[globalStyles.bgImg, styles.backImage]}
      >
        <GameHeader />
        <PageHeader
          navigation={navigation}
          color={"#0066FF"}
          title={"치장"}
        />
        <View style={styles.mainContent}>
          <View style={styles.select}>
            <View style={styles.selectBack}>
              <Animal aType={selectAnimal} aSize={2} />
            </View>
          </View>
          <AccessoryList/>
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
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "yellow",
  },
  selectBack: {
    width: "60%",
    flex: 0.9,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
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
