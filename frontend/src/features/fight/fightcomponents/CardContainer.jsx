import startBattle from "./startBattle";
import { Animated } from "react-native";
import Card from "../fightcomponents/Card";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTimeOut } from "../../../actions/loadingActions";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";
import { setPlayerSelect, decreaseCard } from "../../../actions/cardActions";
import { setTurn, setEndGame, setResult } from "../../../actions/turnActions";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";

const cardContainer = () => {
  const dispatch = useDispatch();

  const playerAnimal = useSelector((state) => state.animal.player);
  const enemyAnimal = useSelector((state) => state.animal.enemy);
  const playerCard = useSelector((state) => state.card.playerCard);
  const enemyCard = useSelector((state) => state.card.enemyCard);
  const playerHp = useSelector((state) => state.loading.playerHp.playerNowHp);
  const enemyHp = useSelector((state) => state.loading.enemyHp.enemyNowHp);
  const playerMaxHp = useSelector(
    (state) => state.loading.playerHp.playerMaxHp
  );
  const enemyMaxHp = useSelector((state) => state.loading.enemyHp.enemyMaxHp);
  const playerGuts = useSelector((state) => state.loading.guts.playerGuts);
  const enemyGuts = useSelector((state) => state.loading.guts.enemyGuts);
  const isTimeout = useSelector((state) => state.loading.isTimeout);
  let turn = useSelector((state) => state.turn.turn);

  const [doubleClick, setDoubleClick] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalPosition] = useState(new Animated.Value(-ScreenHeight));

  const cardTypes = ["skill", "exchange", "defence", "counter", "attack"];

  useEffect(() => {
    if (isTimeout) {
      dispatch(setTimeOut(true));
      const randomPlayerCard = getRandomPlayerCardType(playerCard);
      handleCardClick(randomPlayerCard, playerCard[randomPlayerCard]);
      dispatch(decreaseCard(randomPlayerCard));
      handleBattle(randomPlayerCard);
    }
  }, [isTimeout]);

  const checkEnemyCardAvailability = (playerCard) => {
    return cardTypes.filter((key) => {
      return (
        (key === "skill" && playerCard[key] === 3) ||
        (key !== "skill" && playerCard[key] > 0)
      );
    });
  };

  const getRandomPlayerCardType = (playerCard) => {
    const availablePlayerCards = checkEnemyCardAvailability(playerCard);
    const randomIndex = Math.floor(Math.random() * availablePlayerCards.length);
    return availablePlayerCards[randomIndex];
  };

  const checkResult = ([playerHp, enemyHp]) => {
    if (playerHp == 0 && enemyHp == 0) {
      return "무승부";
    } else if (playerHp == 0) {
      return "패배";
    } else if (enemyHp == 0) {
      return "승리";
    } else {
      return "continue";
    }
  };

  const finshResult = ([playerHp, enemyHp]) => {
    if (playerHp > enemyHp) {
      return "승리";
    } else if (playerHp < enemyHp) {
      return "패배";
    } else {
      return "무승부";
    }
  };

  const handleBattle = async (selectedType) => {
    const animalHp = await startBattle(
      dispatch,
      selectedType,
      playerCard,
      enemyCard,
      playerAnimal,
      enemyAnimal,
      playerHp,
      enemyHp,
      playerMaxHp,
      enemyMaxHp,
      playerGuts,
      enemyGuts
    );
    const result = checkResult(animalHp);
    if (result === "continue") {
      openModal();
      turn += 1;
      if (turn >= 7) {
        dispatch(setEndGame(true));
        dispatch(setResult(finshResult(animalHp)));
      }
    } else {
      dispatch(setEndGame(true));
      dispatch(setResult(result));
    }
  };

  const handleCardClick = async (type, number) => {
    dispatch(setPlayerSelect({ type, number }));
    if (doubleClick === type) {
      const isSkillAndMax = type === "skill" && playerCard[type] === 3;
      const isNotSkillAndAvailable = type !== "skill" && playerCard[type] > 0;

      if (isSkillAndMax || isNotSkillAndAvailable) {
        dispatch(decreaseCard(type));
        handleBattle(type);
      }
      setDoubleClick("");
    } else {
      setDoubleClick(type);
    }
  };

  const openModal = () => {
    Animated.timing(modalPosition, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setModalVisible(true);
  };

  const closeModal = () => {
    Animated.timing(modalPosition, {
      toValue: -ScreenHeight,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setModalVisible(false);
      dispatch(setTurn(turn + 1));
    });
  };

  return (
    <View style={styles.cardContainer}>
      <Modal
        animationType="none"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.centeredView} onPress={closeModal}>
          <Animated.View style={[styles.modalView, { top: modalPosition }]}>
            <Text style={styles.modalText}>다음 턴</Text>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalView: {
    width: ScreenWidth,
    height: ScreenHeight,
    marginBottom: -ScreenHeight * 0.5,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 100,
    fontWeight: "bold",
    color: "#FFD700",
  },
});

export default cardContainer;
