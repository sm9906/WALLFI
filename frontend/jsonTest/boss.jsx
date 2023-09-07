import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View, Modal, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useLocation } from "../hooks/useMap";
import Constants from "expo-constants";

const GOOGLE_API_KEY = Constants.expoConfig.android.config.googleMaps.apiKey;

const GoogleMap = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const myLocation = useLocation(null);
  const [banks, setBanks] = useState(null);
  const [region, setRegion] = useState(null);
  const [selectedBankDetails, setSelectedBankDetails] = useState(null);

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
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${myLocation[0]},${myLocation[1]}&radius=400&type=bank&keyword=신한은행&key=${GOOGLE_API_KEY}`
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
        console.log(data.result);
        setSelectedBankDetails(data.result);
      });
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  if (!region) return null;

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
            style={styles.battleModal}
            onStartShouldSetResponder={() => true}
          >
            <Text style={styles.bossName}>{selectedBankDetails?.name}</Text>
            <Text>{selectedBankDetails?.formatted_address}</Text>
            <Text>{selectedBankDetails?.formatted_phone_number}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.battleButton}>
              <Text>배틀 시작!</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text>닫기</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default GoogleMap;

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
  },
  modalContent: {
    width: "80%",
    height: "80%",
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modalIn: {
    width: "80%",
    height: "80%",
    backgroundColor: "white",
    padding: 20,
  },
  battleModal: {
    width: "80%",
    height: "50%",
    backgroundColor: "#f4f4f4",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 5,
    borderColor: "#333",
  },
  bossName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  battleButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ff4500",
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
});
