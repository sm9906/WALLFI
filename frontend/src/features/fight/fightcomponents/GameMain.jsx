import React from "react";
import HpBar from "./HpBar";
import { useSelector } from "react-redux";
import Card from "../fightcomponents/Card";
import Animal from "../fightcomponents/Animal";
import { View, StyleSheet } from "react-native";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";

const GameMain = () => {
  const playerCard = useSelector((state) => state.cardReducer.playerSelect);
  const enemyCard = useSelector((state) => state.cardReducer.enemySelect);
  const playerHp = useSelector((state) => state.loadingReducer.hp.playerHp);
  const enemyHp = useSelector((state) => state.loadingReducer.hp.enemyHp);
  const battleLoading = useSelector(
    (state) => state.loadingReducer.battleLoading
  );

  return (
    <View style={styles.gameMain}>
      <View style={styles.time}>
        {/* 타이머로 대체할거 타는 밧줄 이라던가 */}
      </View>
      <View style={styles.cardAAnimal}>
        <View style={styles.cardSelect}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  gameMain: {
    flexDirection: "row",
    height: ScreenHeight * 0.45,
    marginRight: ScreenWidth * 0.2,
    // backgroundColor: "blue",
  },
  time: {
    // height: ScreenHeight * 0.45,
    width: ScreenWidth * 0.1,
    // backgroundColor: "red",
  },
  cardAAnimal: {
    height: ScreenHeight * 0.45,
    width: ScreenWidth * 0.7,
    justifyContent: "space-between",
    // backgroundColor: "yellow",
  },
  cardSelect: {
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
