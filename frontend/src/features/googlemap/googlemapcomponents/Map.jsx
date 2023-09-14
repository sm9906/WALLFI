import Constants from "expo-constants";
import { useState, useEffect } from "react";
import { useLocation } from "../googlemaphooks/UseMap";
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";

const GOOGLE_API_KEY = Constants.expoConfig.android.config.googleMaps.apiKey;

const Map = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const myLocation = useLocation(null);
  const [banks, setBanks] = useState(null);
  const [region, setRegion] = useState(null);
  const [selectedBankDetails, setSelectedBankDetails] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (myLocation) {
      const newRegion = {
        latitude: myLocation[0],
        longitude: myLocation[1],
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion);

      fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${myLocation[0]},${myLocation[1]}&radius=1000&type=bank&keyword=신한은행&key=${GOOGLE_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          setBanks(data.results);
        });
    }
  }, [myLocation]);

  const handleMarkerPress = (bank) => {
    fetchBankDetails(bank.place_id);
    setModalVisible(true);
  };

  const fetchBankDetails = (placeId) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSelectedBankDetails(data.result);
      });
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  if (!region) return null;

  const handleGoToBattle = () => {
  const randomNum = Math.floor(Math.random() * 9) + 1;
  navigation.navigate("MainBattle", { randomNum: randomNum });
  }

  return (
    <View style={styles.screen}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        loadingEnabled
        region={region}
        provider={PROVIDER_GOOGLE}

        // 지도 이동용
        // onRegionChange={region => {
        //   setLocation({
        //     latitude: region.latitude,
        //     longitude: region.longitude,
        //   });
        // }}
        // onRegionChangeComplete={region => {
        //   setLocation({
        //     latitude: region.latitude,
        //     longitude: region.longitude,
        //   });
        // }}
      >
        {banks &&
          banks.map((bank, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: bank.geometry.location.lat,
                longitude: bank.geometry.location.lng,
              }}
              title={bank.name}
              description={bank.vicinity}
              onPress={() => handleMarkerPress(bank)}
            />
          ))}
      </MapView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={styles.modalBack}
          activeOpacity={1}
          onPressOut={closeModal}
        >
          <View
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.modalIn}>
              <Image
                // source={require("./../../../assets/images/stone.png")}
                style={styles.modalImage}
              />
              <Text style={styles.modalText}>{selectedBankDetails?.name}</Text>
              <Text style={styles.modalText}>
                {selectedBankDetails?.formatted_address}
              </Text>
              <Text style={styles.modalText}>
                {selectedBankDetails?.formatted_phone_number}
              </Text>
              <Button
                title="배틀로 이동"
                onPress={handleGoToBattle}
              />
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  modalBack: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContent: {
    width: "80%",
    height: "50%",
    backgroundColor: "#2c2c2c",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ffd700",
    borderWidth: 4,
    borderRadius: 15,
  },
  modalIn: {
    width: "90%",
    height: "90%",
    justifyContent: "space-between",
  },
  modalText: {
    color: "#ffd700",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ffd700",
    borderColor: "#2c2c2c",
    borderWidth: 2,
    borderRadius: 5,
    alignItems: "center",
  },
  modalImage: {
    width: "40%",
    height: "40%",
    marginBottom: 20,
  },
});
