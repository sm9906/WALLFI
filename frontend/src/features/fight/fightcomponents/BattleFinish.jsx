import React from "react";
import axios from "../../../common/http-common";
import { useDispatch, useSelector } from "react-redux";
import { resetCard } from "../../../actions/cardActions";
import { resetTurn } from "../../../actions/turnActions";
import { useNavigation } from "@react-navigation/native";
import { resetAnimal } from "../../../actions/animalAction";
import { resetLoading } from "../../../actions/loadingActions";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";

const BattleFinish = () => {
  const navigation = useNavigation();

  const battleResult = useSelector((state) => state.turn.res);
  const bankIdx = useSelector((state) => state.loading.bankIdx);
  const dispatch = useDispatch();

  const resultToServer = async () => {
    // 결과값 서버로 전송
    try {
      await axios.post(`/battle?branchIdx=${bankIdx}&userId=ssafy`, {
        userId: "ssafy",
      });
    } catch (error) {
      console.error("배틀 결과 전송중 오류가 발생했습니다.", error);
    }
  };

  const resetBattle = () => {
    resultToServer();
    dispatch(resetCard());
    dispatch(resetLoading());
    dispatch(resetTurn());
    dispatch(resetAnimal());
  };

  const handleGoToMap = () => {
    resetBattle();
    navigation.navigate("GameHome");
  };

  return (
    <View style={styles.battleFinish}>
      <Text style={styles.battleResult}>{battleResult}</Text>
      <TouchableOpacity style={styles.button} onPress={handleGoToMap}>
        <Text style={styles.buttonText}>홈으로 이동</Text>
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
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
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
  },
});

export default BattleFinish;
