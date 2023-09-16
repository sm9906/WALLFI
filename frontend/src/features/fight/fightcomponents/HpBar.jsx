import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Animated, Text } from "react-native";
import { ScreenHeight, ScreenWidth } from "./../fightcomponents/ScreenSize";

const ANIMATION_DURATION = 2000;
const HP_BAR_WIDTH_RATIO = 0.16;
const HP_BAR_HEIGHT_RATIO = 0.18;
const HP_BAR_MARGIN_TOP_RATIO = 0.007;
const MAX_HP = 50;
const MIN_HP = 0;

const HpBar = ({ hP, maxHp }) => {
  const [displayedHP, setDisplayedHP] = useState(hP);
  const animatedHPValue = useRef(new Animated.Value(hP)).current;

  const animateHPChange = () => {
    Animated.timing(animatedHPValue, {
      duration: ANIMATION_DURATION,
      toValue: hP,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (hP > MAX_HP) {
      hP = MAX_HP;
    } else if (hP < MIN_HP) {
      hP = MIN_HP;
    }

    const listener = animatedHPValue.addListener(({ value }) => {
      setDisplayedHP(Math.floor(value));
    });
    animateHPChange();
    return () => {
      animatedHPValue.removeListener(listener);
    };
  }, [hP]);

  const hpBarHeight =
    (ScreenHeight * HP_BAR_HEIGHT_RATIO * displayedHP) / maxHp;
  const hpBarColor = animatedHPValue.interpolate({
    inputRange: [0, maxHp * 0.25, maxHp * 0.5, maxHp * 0.75, maxHp],
    outputRange: ["#FF4F1F", "#DE9A3A", "#F5DD4C", "#9FDE3A", "#34FA62"],
  });

  return (
    <Animated.View
      style={[
        styles.hpBar,
        { height: hpBarHeight, backgroundColor: hpBarColor },
      ]}
    >
      <Text style={styles.hpText}>
        {displayedHP}/{maxHp}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  hpBar: {
    width: ScreenWidth * HP_BAR_WIDTH_RATIO,
    marginTop: ScreenHeight * HP_BAR_MARGIN_TOP_RATIO,
    alignItems: "center",
    borderRadius:5,
  },
  hpText: {
    color: "#FFFFFF", 
    marginTop: ScreenHeight * HP_BAR_MARGIN_TOP_RATIO,
    fontWeight: "bold",
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    paddingHorizontal: 5,
    borderRadius: 3,
  },
});

export default HpBar;