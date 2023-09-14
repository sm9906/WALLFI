import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Map from "../googlemapcomponents/Map";
import { LocationContext } from "../googlemaphooks/UseMap";
import { ScreenHeight, ScreenWidth } from './../googlemapcomponents/ScreenSize';


const LOCATION_TASK_NAME = "background-location-task";

export const useLocation = () => useContext(LocationContext);

const getCurrentTimeString = () => {
  const now = new Date();
  return `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("location");
    const data = jsonValue != null ? JSON.parse(jsonValue) : {};
    // // 최근 10개의 데이터만 가져오기
    // const limitedData = Object.entries(data).slice(-10).reduce((acc, [key, value]) => {
    //   acc[key] = value;
    //   return acc;
    // }, {});
    // return limitedData;
    // console.log(data)
    return data;
  } catch (err) {
    console.error("좌표 획득 오류", err);
  }
};

const setData = async (latitude, longitude) => {
  try {
    const storedData = await getData();
    const currentTime = getCurrentTimeString();
    const updatedData = {
      ...storedData,
      [currentTime]: [latitude, longitude],
    };
    await AsyncStorage.setItem("location", JSON.stringify(updatedData));
  } catch (err) {
    console.error("좌표 저장 오류", err);
  }
};

const isServerConnected = async () => {
  try {
    const response = await fetch("서버 주소");
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

const sendDataToServer = async (data) => {
  // 서버로 데이터 전송
};

export const LocationProvider = ({ children }) => {
  const [myLocation, setMyLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.getBackgroundPermissionsAsync();
      if (status !== 'granted') {
        const response = await Location.requestBackgroundPermissionsAsync();
        status = response.status;
      }
      if (status !== "granted") {
        console.error("위치 권한이 거부되었습니다.");
        return;
      }

      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        distanceInterval: 10,
        timeInterval: 5000, // 몇초마다 갱신하지
      });

      if (await isServerConnected()) {
        const storedData = await getData();
        if (storedData) {
          await sendDataToServer(storedData);
          await AsyncStorage.removeItem("location");
        }
      }
    })();
  }, []);

  TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error) {
      console.error(error);
      return;
    }
    if (data) {
      const {
        locations: [location],
      } = data;
      setMyLocation([location.coords.latitude, location.coords.longitude]);

      if (await isServerConnected()) {
        sendDataToServer([location.coords.latitude, location.coords.longitude]);
      } else {
        setData(location.coords.latitude, location.coords.longitude);
      }
    }
  });

  return (
    <LocationContext.Provider value={myLocation}>
      {children}
    </LocationContext.Provider>
  );
};

export default function MapScreen() {
  return (
    <LocationProvider>
      <View style={styles.container}>
        <Map />
      </View>
    </LocationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: ScreenHeight,
    width: ScreenWidth,
  },
});
