import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../fightcomponents/Card";
import { View, StyleSheet, Text, Animated } from "react-native";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";
import { setGuide } from "../../../actions/turnActions";
import { setTimeOut } from "../../../actions/loadingActions";

const GameHeader = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.battleLoading);
  const turn = useSelector((state) => state.turn.turn);
  

  const [loadingText, setLoadingText] = useState("전투중");
  const loadingStates = ["전투중", "전투중.", "전투중..", "전투중..."];
  const [timer, setTimer] = useState(20);
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimer(20)
  }, [turn])
  

  useEffect(() => {
    if (timer === 0) {
      dispatch(setTimeOut(true));
    }
  }, [timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prevText) => {
        const currentIndex = loadingStates.indexOf(prevText);
        const nextIndex = (currentIndex + 1) % loadingStates.length;
        return loadingStates[nextIndex];
      });
    }, 500);

    let timerInterval;
    if (!isLoading) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(timerInterval);
            return 0;
          }
        });
      }, 1000);
    }

    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateValue, {
          toValue: 0.5,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.delay(1000),
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.delay(1000),
      ])
    ).start();

    return () => {
      clearInterval(interval);
      clearInterval(timerInterval);
    };
  }, [isLoading]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["0deg", "180deg", "360deg"],
  });

  const handleCardPress = () => {
    dispatch(setGuide(true));
  };

  return (
    <View style={styles.gameHeader}>
      <View style={styles.loading}>
        {isLoading ? (
          <Text style={styles.loadingText}>{loadingText}</Text>
        ) : (
          <View style={styles.time}>
            <Animated.View style={{ transform: [{ rotate }] }}>
              <Card cType={"time"} cNumber={0} cStyle={0.3} />
            </Animated.View>

            <Text style={styles.timeText}>{timer}</Text>
          </View>
        )}
      </View>
      <View style={styles.turn}>
        <Text style={styles.turnText}>{turn + 1} 턴</Text>
      </View>
      <View style={styles.question}>
        <Card
          cType={"question"}
          cNumber={0}
          cStyle={0.4}
          onPress={handleCardPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameHeader: {
    flexDirection: "row",
    width: ScreenWidth * 0.9,
    marginTop: ScreenHeight * 0.01,
    marginRight: ScreenWidth * 0.1,
    justifyContent: "center",
    gap: ScreenWidth * 0.02,
    backgroundColor: "#1E1E1E",
    padding: 10,
    borderRadius: 10,
  },
  loading: {
    justifyContent: "center",
    width: ScreenWidth * 0.3,
    // backgroundColor:"red"
  },
  loadingText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD700",
    textShadowColor: "#3E3E3E",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  time: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  timeText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD700",
    textShadowColor: "#3E3E3E",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  turn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: ScreenWidth * 0.02,
    width: ScreenWidth * 0.2,
    borderRadius: 10,
    backgroundColor: "#3E3E3E",
  },
  turnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD700",
  },
  question: {
    width: ScreenWidth * 0.3,
    alignItems: "center",
    // backgroundColor:"red"
  },
});

export default GameHeader;
