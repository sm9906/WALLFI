import HpBar from "./HpBar";
import React, { useState } from "react";
import Card from "../fightcomponents/Card";
import Animal from "../fightcomponents/Animal";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";

const GameMain = () => {
  const playerCard = useSelector((state) => state.cardReducer.playerSelect);
  const enemyCard = useSelector((state) => state.cardReducer.enemySelect);
  const battleLoading = useSelector(
    (state) => state.loadingReducer.battleLoading
  );

  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100);
  return (
    <View style={styles.CardAAnimal}>
      <View style={styles.CardSelect}>
        <Card
          cType={playerCard.type}
          cNumber={playerCard.number}
          cStyle={0.8}
        />
        {battleLoading ? (
          <Card
            cType={enemyCard.type}
            cNumber={enemyCard.number}
            cStyle={0.8}
          />
        ) : (
          <Card cType={"enemy"} cNumber={0} cStyle={0.8} />
        )}
      </View>
      <View style={styles.AnimalAHp}>
        <View style={styles.MyAnimal}>
          <Animal aType={"lion"} aPosition={-1} aSize={1} />
          <HpBar hP={playerHp}></HpBar>
        </View>
        <View style={styles.EnemyAnimal}>
          <Animal aType={"panda"} aSize={1} />
          <HpBar hP={enemyHp}></HpBar>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CardAAnimal: {
    height: ScreenHeight * 0.45,
    width: ScreenWidth * 0.7,
    justifyContent: "space-between",
    marginRight: ScreenWidth * 0.1,
    // backgroundColor: "yellow",
  },
  CardSelect: {
    flexDirection: "row",
    width: ScreenWidth * 0.66,
    justifyContent: "space-between",
    marginLeft: ScreenWidth * 0.02,
    // backgroundColor: "red",
  },
  AnimalAHp: {
    flexDirection: "row",
    width: ScreenWidth * 0.7,
    height: ScreenHeight * 0.3,
    justifyContent: "space-between",
    // backgroundColor: "blue",
  },
  MyAnimal: {
    height: ScreenHeight * 0.3,
    alignItems: "center",
    justifyContent: "flex-end",
    // backgroundColor: "green",
  },
  EnemyAnimal: {
    height: ScreenHeight * 0.3,
    alignItems: "center",
    justifyContent: "flex-end",
    // backgroundColor: "green",
  },
});

export default GameMain;
