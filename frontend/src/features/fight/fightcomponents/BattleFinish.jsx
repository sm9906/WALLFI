import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";
import { resetCard } from "../../../actions/cardActions";
import { resetLoading } from "../../../actions/loadingActions";
import { resetTurn } from "../../../actions/turnActions";
import { resetAnimal } from "../../../actions/animalAction";

const BattleFinish = () => {
  const navigation = useNavigation();

  const battleResult = useSelector((state) => state.turnReducer.res);
  const dispatch = useDispatch();

  const resetBattle = () => {
    dispatch(resetCard());
    dispatch(resetLoading());
    dispatch(resetTurn());
    dispatch(resetAnimal());
  };

  const handleGoToMap = () => {
    resetBattle();
    navigation.navigate("GoogleMap");
  };

  return (
    <View style={styles.battleFinish}>
      <Text style={styles.battleResult}>{battleResult}</Text>
      <TouchableOpacity style={styles.button} onPress={handleGoToMap}>
        <Text style={styles.buttonText}>지도로 이동</Text>
        {/* 나중에 이미지로 대체 */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  battleFinish: {
    height: ScreenHeight,
    width: ScreenWidth,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a", 
  },
  battleResult: {
    color: "#ffd700",
    fontSize: 128,
    fontWeight: "bold",
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  button: {
    padding: 15,
    backgroundColor: "#ffd700",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#1a1a1a",
    fontWeight: "bold",
    fontSize: 18,
  }
});

export default BattleFinish;
