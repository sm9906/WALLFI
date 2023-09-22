import React, { useEffect, useState } from "react";
import {
  StatusBar,
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { globalStyles } from "../homestyles/global.js";
import images from "../../../common/imgDict.js";
import GameHeader from "../homecomponents/GameHeader.js";
import PageHeader from "../homecomponents/PageHeader.js";
import Animal from "../../fight/fightcomponents/Animal.jsx";
import AnimalList from "../homecomponents/accessory/AnimalList.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setPressedAnimal } from "../homeSlice.js";
import Modal from "react-native-modal";

export const GameAccessories = ({ navigation }) => {
  const selectAnimal = useSelector((state) => state.home.pressedAnimal);
  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    dispatch(setPressedAnimal(null));
  }, []);

  return (
    <View style={globalStyles.container}>
      <ImageBackground
        source={images.Background.accessory}
        style={[globalStyles.bgImg, styles.backImage]}
      >
        <GameHeader />
        <PageHeader
          navigation={navigation}
          color={"#0066FF"}
          title={"악세서리"}
        />
        <View style={styles.mainContent}>
          <View style={styles.select}>
            <View style={styles.selectBack}>
            <Animal aType={selectAnimal ? selectAnimal.characterType : null} aColor={selectAnimal ? selectAnimal.color : null} aSize={2} />
            </View>
          </View>
          <AnimalList />
          <View style={styles.confirm}>
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => {
                if (selectAnimal) {
                  navigation.navigate("AnimalDeco");
                } else {
                  toggleModal();
                }
              }}
            >
              <Text style={styles.confirmText}>치장하러 가기</Text>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalText}>동물을 먼저 선택해주세요!</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={toggleModal}
                >
                  <Text style={styles.closeButtonText}>닫기</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </View>
      </ImageBackground>
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  backImage: {
    // alignItems: "center",
  },
  mainContent: {
    flex: 7,
    // backgroundColor: "red",
  },
  select: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "yellow",
  },
  selectBack: {
    width: "60%",
    flex: 0.9,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  confirm: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "purple",
  },
  confirmBtn: {
    width: "70%",
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  confirmText: {
    color: "#0066FF",
    fontWeight: "bold",
    fontSize: 35,
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "10%"
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#0066FF",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default GameAccessories;
