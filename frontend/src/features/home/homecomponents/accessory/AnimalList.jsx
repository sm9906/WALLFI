import React, { useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import Animal from "../../../fight/fightcomponents/Animal";
import { useDispatch, useSelector } from "react-redux";
import { setPressedAnimal } from "../../homeSlice";

const { width } = Dimensions.get("window");

export const AnimalList = () => {
  const animals = useSelector((state) => state.home.characters);
  const dispatch = useDispatch();
  const [selectBox, setSelectBox] = useState(null);

  const setAnimal = (animalType) => {
    dispatch(setPressedAnimal(animalType));
    setSelectBox(animalType);
  };

  return (
    <ScrollView
      horizontal={true}
      style={styles.list}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
      }}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
    >
      <View style={styles.gap}></View>
      {animals.map((animalType, index) => (
        <React.Fragment key={index}>
          <View
            style={[
              styles.listBack,
              selectBox === animalType ? styles.selectedBorder : null,
            ]}
          >
            <Animal
              aType={animalType.characterType}
              aColor={animalType.color}
              aSize={1}
              onPress={() => setAnimal(animalType)}
            />
          </View>
          {index !== animals.length - 1 && <View style={styles.gap}></View>}
        </React.Fragment>
      ))}
      <View style={styles.gap}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    flex: 1,
    width: "86%",
    marginLeft: "7%",
    // backgroundColor: "red",
  },
  listBack: {
    height: "75%",
    width: width / 4.3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  selectedBorder: {
    borderWidth: 6,
    borderColor: "gold",
  },
  gap: {
    width: width * 0.041,
  },
});

export default AnimalList;
