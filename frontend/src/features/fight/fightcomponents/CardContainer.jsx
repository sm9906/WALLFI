import animals from "../dummy/animals";
import React, { useState } from "react";
import startBattle from "./startBattle";
import Card from "../fightcomponents/Card";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setTurn, setEndGame, setResult } from "../../../actions/turnActions";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";
import { setPlayerSelect, decreaseCard } from "../../../actions/cardActions";

const cardContainer = () => {
  const dispatch = useDispatch();

  const playerAnimal = useSelector((state) => state.animalReducer.player);
  const enemyAnimal = useSelector((state) => state.animalReducer.enemy);
  const playerCard = useSelector((state) => state.cardReducer.playerCard);
  const enemyCard = useSelector((state) => state.cardReducer.enemyCard);
  const playerHp = useSelector((state) => state.loadingReducer.playerHp.playerNowHp);
  const enemyHp = useSelector((state) => state.loadingReducer.enemyHp.enemyNowHp);
  const playerGuts = useSelector((state) => state.loadingReducer.guts.playerGuts);
  const enemyGuts = useSelector((state) => state.loadingReducer.guts.enemyGuts);
  let turn = useSelector((state) => state.turnReducer.turn);

  const [doubleClick, setDoubleClick] = useState("");

  const checkResult = ([playerHp, enemyHp]) => {
    if (playerHp == 0 && enemyHp == 0) {
      return "draw";
    } else if (playerHp == 0) {
      return "lose";
    } else if (enemyHp == 0) {
      return "win";
    } else {
      return "continue";
    }
  };

  const finshResult = ([playerHp, enemyHp]) => {
    if (playerHp > enemyHp) {
      return "win"
    } else if (playerHp < enemyHp) {
      return "lose"
    } else {
      return "draw"
    }
  }

  const handleCardClick = (type, number) => {
    dispatch(setPlayerSelect({ type, number }));
    if (doubleClick === type) {
      const isSkillAndMax = type === "skill" && playerCard[type] === 3;
      const isNotSkillAndAvailable = type !== "skill" && playerCard[type] > 0;

      if (isSkillAndMax || isNotSkillAndAvailable) {
        dispatch(decreaseCard(type));
        const animalHp = startBattle(
          dispatch,
          type,
          playerCard,
          enemyCard,
          playerAnimal,
          enemyAnimal,
          playerHp,
          enemyHp,
          playerGuts,
          enemyGuts
        );
        const result = checkResult(animalHp);
        if (result == "continue") {
          turn += 1;
          dispatch(setTurn(turn));
          if (turn >= 7) {
            dispatch(setEndGame(true));
            dispatch(setResult(finshResult(animalHp)));
          }
        } else {
          dispatch(setEndGame(true));
          dispatch(setResult(result));
        }
      }
      setDoubleClick("");
    } else {
      setDoubleClick(type);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <Card
        cType={"skill"}
        cNumber={playerCard.skill}
        cStyle={2.13}
        onPress={() => handleCardClick("skill", playerCard.skill)}
      />
      <View style={styles.semiCardContainer}>
        <View style={styles.semiCard}>
          <Card
            cType={"exchange"}
            cNumber={playerCard.exchange}
            onPress={() => handleCardClick("exchange", playerCard.exchange)}
          />
          <Card
            cType={"defence"}
            cNumber={playerCard.defence}
            onPress={() => handleCardClick("defence", playerCard.defence)}
          />
        </View>
        <View style={styles.semiCard}>
          <Card
            cType={"counter"}
            cNumber={playerCard.counter}
            onPress={() => handleCardClick("counter", playerCard.counter)}
          />
          <Card
            cType={"attack"}
            cNumber={playerCard.attack}
            onPress={() => handleCardClick("attack", playerCard.attack)}
          />
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
