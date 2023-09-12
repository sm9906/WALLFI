import React, { useState } from "react";
import startBattle from "./startBattle";
import Card from "../fightcomponents/Card";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";
import { setPlayerSelect, decreaseCard } from "../../../actions/cardActions";

const cardContainer = () => {
  const dispatch = useDispatch();

  const playerCard = useSelector((state) => state.cardReducer.playerCard);
  const enemyCard = useSelector((state) => state.cardReducer.enemyCard);

  const [doubleClick, setDoubleClick] = useState("");

  const handleCardClick = (type, number) => {
    dispatch(setPlayerSelect({ type, number }));
    if (doubleClick === type) {
      const isSkillAndMax = type === "skill" && playerCard[type] === 3;
      const isNotSkillAndAvailable = type !== "skill" && playerCard[type] > 0;

      if (isSkillAndMax || isNotSkillAndAvailable) {
        dispatch(decreaseCard(type));
        startBattle(dispatch, type, enemyCard); 
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
