import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Button } from "react-native";
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
      <Text>{battleResult}</Text>
      <Button title="지도로 이동" onPress={handleGoToMap} />
      {/* 결과창 나중에 이미지로 대체 */}
    </View>
  );
};

const styles = StyleSheet.create({
  battleFinish: {
    height: ScreenHeight,
    width: ScreenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BattleFinish;
