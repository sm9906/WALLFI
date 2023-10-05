import Accessory from "./Accessory";
import { useDispatch } from "react-redux";
import { getAccessoryList } from "../../homeSlice";
import React, { useEffect, useState } from "react";
import { setPressedAccessory } from "../../homeSlice";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";

const { width } = Dimensions.get("window");

export const AccessoryList = () => {
  const dispatch = useDispatch();
  
  const [accessorys, setAccessorys] = useState([]);
  const [selectBox, setSelectBox] = useState(null);

  useEffect(() => {
    const fetchAccessoryList = async () => {
      const result = await dispatch(getAccessoryList());
      if (getAccessoryList.fulfilled.match(result)) {
        setAccessorys(result.payload);
      }
    };

    fetchAccessoryList();
  }, [dispatch]);

  const setDeco = (accessoryItem) => {
    dispatch(
      setPressedAccessory([
        accessoryItem.itemName.toLowerCase(),
        accessoryItem.itemIdx,
      ])
    );
    setSelectBox(accessoryItem.itemName);
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
      {accessorys.length === 0 ? (
        <View style={styles.noAccessoryContainer}>
          <Text style={styles.noAccessoryText}>
            보유한 악세사리가 없습니다.
          </Text>
        </View>
      ) : (
        accessorys.map((accessoryItem, index) => (
          <React.Fragment key={index}>
            <View
              style={[
                styles.listBack,
                selectBox === accessoryItem.itemName
                  ? styles.selectedBorder
                  : null,
              ]}
            >
              <Accessory
                aType={accessoryItem.itemName.toLowerCase()}
                aSize={0.7}
                onPress={() => setDeco(accessoryItem)}
              />
            </View>
            {index !== accessorys.length - 1 && (
              <View style={styles.gap}></View>
            )}
          </React.Fragment>
        ))
      )}
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
  noAccessoryContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  noAccessoryText: {
    fontSize: 16,
    color: "gray",
  },
});

export default AccessoryList;
