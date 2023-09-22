import React, { useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import Accessory from "./Accessory";
import { useDispatch } from "react-redux";
import { setPressedAnimal } from "../../homeSlice";

const { width } = Dimensions.get("window");

export const AccessoryList = () => {
  const accessorys = ["crown_cap", "ruby_necklace", "ssafy_cap" ]; // 나중에 악세 리스트로 교체
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
      {accessorys.map((accessoryType, index) => (
        <React.Fragment key={index}>
          <View
            style={[
              styles.listBack,
              selectBox === accessoryType ? styles.selectedBorder : null,
            ]}
          >
            <Accessory
              aType={accessoryType}
              aSize={0.7}
              onPress={() => setAnimal(accessoryType)}
            />
          </View>
          {index !== accessorys.length - 1 && <View style={styles.gap}></View>}
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

export default AccessoryList;
