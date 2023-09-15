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

const getCurrentTimeString = () => { // 현재 시간 저장, 좌표 저장시 키값일 예정
  const now = new Date();
  return `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
};

const getData = async () => { // 저장소에 저장한 좌표값들 꺼내옴 (백그라운드 구동 용)
  try {
    const jsonValue = await AsyncStorage.getItem("location");
    const data = jsonValue != null ? JSON.parse(jsonValue) : {};
    return data;
  } catch (err) {
    console.error("좌표 획득 오류", err);
  }
};

const setData = async (latitude, longitude) => { // 저장소에 좌표값들 저장 (백그라운드 구동 용)
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

const isServerConnected = async () => { // 서버 연결되었는지 여부
  try {
    const response = await fetch("서버 주소");
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

const sendDataToServer = async (data) => { // 내가 모은 좌표 데이터들 전송 (근데 아직 api 구현 안된듯)
  // 서버로 데이터 전송
};

export const LocationProvider = ({ children }) => { // 위치 수집 권한 요청
  const [myLocation, setMyLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.getBackgroundPermissionsAsync(); // 좌표값 받아도 되나요?
      if (status !== 'granted') {
        const response = await Location.requestBackgroundPermissionsAsync(); // 좌표값 받아도 되는걸 허가받아도 되나요?
        status = response.status;
      }
      if (status !== "granted") {
        console.error("위치 권한이 거부되었습니다."); // 허가창 안뜨고 바로 거부당할시 설정 - 앱관리 - axios어플 - 권한 설정 - 위치 데이터 관련된거 허용
        return;
      }

      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        distanceInterval: 10,
        timeInterval: 5000, // 내 좌표 몇초마다 갱신할지
      });

      if (await isServerConnected()) { // 서버 연결되어 있으면 저장소에서 데이터 꺼내서 서버로 전송
        const storedData = await getData();
        if (storedData) {
          await sendDataToServer(storedData);
          await AsyncStorage.removeItem("location");
        }
      }
    })();
  }, []);

  TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => { // 백그라운드용 로직
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
