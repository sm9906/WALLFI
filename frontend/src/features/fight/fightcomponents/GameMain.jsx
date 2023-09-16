import HpBar from "./HpBar";
import Card from "../fightcomponents/Card";
import Animal from "../fightcomponents/Animal";
import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGuide } from "../../../actions/turnActions";
import { View, StyleSheet, Modal, Text, Button, Animated } from "react-native";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";

const GameMain = () => {
  const dispatch = useDispatch();

  const playerSelect = useSelector((state) => state.card.playerSelect);
  const playerAnimal = useSelector((state) => state.animal.player);
  const enemyAnimal = useSelector((state) => state.animal.enemy);
  const playerCard = useSelector((state) => state.card.playerSelect);
  const enemyCard = useSelector((state) => state.card.enemySelect);
  const playerHp = useSelector((state) => state.loading.playerHp.playerNowHp);
  const enemyHp = useSelector((state) => state.loading.enemyHp.enemyNowHp);
  const playerMaxHp = useSelector(
    (state) => state.loading.playerHp.playerMaxHp
  );
  const enemyMaxHp = useSelector((state) => state.loading.enemyHp.enemyMaxHp);
  const battleLoading = useSelector((state) => state.loading.battleLoading);
  const playerGuts = useSelector((state) => state.loading.guts.playerGuts);
  const enemyGuts = useSelector((state) => state.loading.guts.enemyGuts);
  const guide = useSelector((state) => state.turn.guide);
  const playerRotateValue = useRef(new Animated.Value(0)).current;
  const enemyRotateValue = useRef(new Animated.Value(0)).current;
  const playerJumpValue = useRef(new Animated.Value(0)).current;
  const enemyJumpValue = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // 플레이어 애니메이션
    Animated.parallel([
      Animated.timing(playerRotateValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(playerJumpValue, {
          toValue: -20, // 점프 높이
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(playerJumpValue, {
          toValue: 0, // 원래 위치로 돌아옴
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      playerRotateValue.setValue(0); // 다시 0 초기화
    });
  }, [playerCard]);

  useEffect(() => {
    // 적 애니메이션
    Animated.parallel([
      Animated.timing(enemyRotateValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(enemyJumpValue, {
          toValue: -20, // 점프 높이
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(enemyJumpValue, {
          toValue: 0, // 원래 위치로 돌아옴
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      enemyRotateValue.setValue(0); // 다시 0 초기화
    });
  }, [enemyCard]);

  const playerRotate = playerRotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const enemyRotate = enemyRotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.gameMain}>
      <View style={styles.time}>
        {Array.from({ length: playerGuts }).map((_, index) => (
          <Card key={index} cType={"guts"} cNumber={0} cStyle={0.5} />
        ))}
      </View>
      {guide && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={guide}
          onRequestClose={() => {
            dispatch(setGuide(false));
          }}
        >
          <View
            style={styles.centeredView}
            onStartShouldSetResponder={() => {
              dispatch(setGuide(false));
              return true;
            }}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalText}>스킬 > 동물마다 특수 효과</Text>
              <Text style={styles.modalText}>공격 > 상대방에게 피해</Text>
              <Text style={styles.modalText}>방어 > 자신의 체력 회복</Text>
              <Text style={styles.modalText}>반격 > 상대의 카드 강탈</Text>
              <Text style={styles.modalText}>(스킬 제외)</Text>
              <Text style={styles.modalText}>-환율-</Text>
              <Text style={styles.modalText}>상승 > 공격 카드 * 전일비</Text>
              <Text style={styles.modalText}>하락 > 방어 카드 * 전일비</Text>
              <Text style={styles.modalText}>동일 > 반격 카드 (스킬 포함)</Text>
              <Button
                title="닫기"
                onPress={() => {
                  dispatch(setGuide(false));
                }}
              />
            </View>
          </View>
        </Modal>
      )}
      <View style={styles.cardAAnimal}>
        <View style={styles.cardSelect}>
          <Animated.View style={{ transform: [{ rotateY: playerRotate }] }}>
            <Card
              cType={playerCard.type}
              cNumber={playerCard.number}
              cStyle={0.8}
            />
          </Animated.View>
          {battleLoading ? (
            <Animated.View style={{ transform: [{ rotateY: enemyRotate }] }}>
              <Card
                cType={enemyCard.type}
                cNumber={enemyCard.number}
                cStyle={0.8}
              />
            </Animated.View>
          ) : (
            <Card cType={"enemy"} cNumber={0} cStyle={0.8} />
          )}
        </View>
        <View style={styles.AnimalAHp}>
          <View style={styles.MyAnimal}>
            <Animated.View
              style={{ transform: [{ translateY: playerJumpValue }] }}
            >
              <Animal aType={playerAnimal.animal} aPosition={-1} aSize={1} />
            </Animated.View>
            <HpBar hP={playerHp} maxHp={playerMaxHp}></HpBar>
          </View>
          <View style={styles.EnemyAnimal}>
            <Animated.View
              style={{ transform: [{ translateY: enemyJumpValue }] }}
            >
              <Animal aType={enemyAnimal.animal} aSize={1} />
            </Animated.View>
            <HpBar hP={enemyHp} maxHp={enemyMaxHp}></HpBar>
          </View>
        </View>
      </View>
      <View style={styles.time}>
        {Array.from({ length: enemyGuts }).map((_, index) => (
          <Card key={index} cType={"guts"} cNumber={0} cStyle={0.5} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameMain: {
    flexDirection: "row",
    height: ScreenHeight * 0.45,
    marginRight: ScreenWidth * 0.1,
    // backgroundColor: "blue",
  },
  time: {
    // height: ScreenHeight * 0.45,
    width: ScreenWidth * 0.1,
    justifyContent: "flex-end",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명한 배경
  },
  modalView: {
    width: ScreenWidth * 0.8,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFA800", // 게임의 주요 컬러
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    backgroundColor: "#FFA800",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default GameMain;
