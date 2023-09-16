import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { globalStyles } from "../homestyles/global.js";

import GameHeader from "../homecomponents/GameHeader.js";
import mission from "../../.././assets/background/mission.png";
import backHome from "../../.././assets/game/button/backHome.png";
import axios from "axios";
import { requestGet } from "../../../common/http-common.js";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../homecomponents/ScreenSize.js";

export default function Mission({ navigation }) {
  [quests, setQuest] = useState([
    { count: 0, status: 1, title: "이체하기", total: 2, type: "Daily" },
    { count: 0, status: 1, title: "환전조회", total: 1, type: "Daily" },
    { count: 0, status: 1, title: "먹이주기", total: 3, type: "Daily" },
    { count: 0, status: 0, title: "운동하기", total: 3, type: "Daily" },
    { count: 0, status: 0, title: "이체하기", total: 2, type: "Daily" },
    { count: 0, status: 0, title: "환전조회", total: 1, type: "Daily" },
    { count: 0, status: 0, title: "먹이주기", total: 3, type: "Daily" },
    { count: 0, status: 0, title: "운동하기", total: 3, type: "Daily" },
    { count: 0, status: 0, title: "이체하기", total: 2, type: "Daily" },
    { count: 0, status: 0, title: "환전조회", total: 1, type: "Daily" },
    { count: 0, status: 0, title: "먹이주기", total: 3, type: "Daily" },
    { count: 0, status: 0, title: "운동하기", total: 3, type: "Daily" },
    { count: 0, status: 0, title: "이체하기", total: 2, type: "Daily" },
    { count: 0, status: 0, title: "환전조회", total: 1, type: "Daily" },
    { count: 0, status: 0, title: "먹이주기", total: 3, type: "Daily" },
    { count: 0, status: 0, title: "운동하기", total: 3, type: "Daily" },
  ]);

  //   useEffect(() => {
  //     axios
  //       .get("http://192.168.9.30:8094/quest?userId=ssafy")
  //       .then((res) => {
  //         console.log("res:", res.data);
  //         setQuest(res.data);
  //         console.log("quest: ", quests);
  //       })
  //       .catch((error) => {
  //         console.error("Quest 불러오기 에러 발생: ", error);
  //       });
  //   }, []);

  return (
    <View style={globalStyles.container}>
      <ImageBackground source={mission} style={[globalStyles.bgImg, { alignItems: "center" }]}>
        <GameHeader />
        <MissionHeader navigation={navigation} />
        <MenuBar />
        {/* <View style={{ flex: 6.5 }}></View> */}
      </ImageBackground>
      <StatusBar />
    </View>
  );
}

function MissionHeader(props) {
  return (
    <View style={{ flex: 1.2, flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity
        style={[globalStyles.navigationBtn, { backgroundColor: "#76009F" }]}
        onPress={() => props.navigation.navigate("GameHome")}
      >
        <Image source={backHome} style={globalStyles.btnIcon} />
      </TouchableOpacity>
      <Text style={[globalStyles.navigationText, { color: "#76009F" }]}>미션</Text>
    </View>
  );
}

function getQuestReward(status) {
  
  if (status) {
    console.log(status);
  } else {
    console.log(status);
  }
}

function MenuBar(props) {
  return (
    <View style={{ flex: 6 }}>
      <ScrollView>
        <View style={styles.questContainer}>
          {quests.map((quest, idx) => {
            return (
              <View key={idx} style={styles.quest}>
                <View style={styles.questTitleArea}>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>{quest.title}</Text>
                </View>
                <View style={styles.questStatusArea}>
                  {/* <Text>{quest.status}</Text> */}
                  {/* <Button title={quest.status ? "완료" : "진행중"} onPress={getQuestReward.bind(this, quest.status)}/>  */}

                  <TouchableOpacity onPress={getQuestReward.bind(this, quest.status)}>
                    <View
                      style={[
                        { width: 60, height: 42 },
                        { backgroundColor: quest.status ? "#E5FFD4" : "#FFE8BA" },
                        { alignItems: "center", justifyContent: "center" },
                        { borderRadius: 10 },
                      ]}
                    >
                      <Text>{quest.status ? "완료" : quest.count + "/" + quest.total}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  questContainer: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  quest: {
    flexDirection: "row",
    width: "85%",
    height: 60,
    marginVertical: 5,
    backgroundColor: "#FBE3FF",
  },
  questTitleArea: {
    flex: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  questStatusArea: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});
