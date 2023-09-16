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
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

export default function Mission({ navigation }) {
  [quests, setQuest] = useState({
    "Daily": [
      {
        idx: 1,
        type: "Daily",
        title: "D이체하기",
        count: 2,
        total: 2,
        status: 2,
      },
      {
        idx: 2,
        type: "Daily",
        title: "D환전조회",
        count: 0,
        total: 1,
        status: 0,
      },
      {
        idx: 3,
        type: "Daily",
        title: "D먹이주기",
        count: 0,
        total: 3,
        status: 2,
      },
      {
        idx: 4,
        type: "Daily",
        title: "D운동하기",
        count: 0,
        total: 3,
        status: 0,
      },
    ],
    "Weekly": [
      {
        idx: 1,
        type: "Daily",
        title: "W이체하기",
        count: 2,
        total: 2,
        status: 2,
      },
      {
        idx: 2,
        type: "Daily",
        title: "W환전조회",
        count: 0,
        total: 1,
        status: 0,
      },
      {
        idx: 3,
        type: "Daily",
        title: "W먹이주기",
        count: 0,
        total: 3,
        status: 2,
      },
      {
        idx: 4,
        type: "Daily",
        title: "W운동하기",
        count: 0,
        total: 3,
        status: 0,
      },
    ],
    "Monthly": [
      {
        idx: 1,
        type: "Daily",
        title: "M이체하기",
        count: 2,
        total: 2,
        status: 2,
      },
      {
        idx: 2,
        type: "Daily",
        title: "M환전조회",
        count: 0,
        total: 1,
        status: 0,
      },
      {
        idx: 3,
        type: "Daily",
        title: "M먹이주기",
        count: 0,
        total: 3,
        status: 2,
      },
      {
        idx: 4,
        type: "Daily",
        title: "M운동하기",
        count: 0,
        total: 3,
        status: 0,
      },
    ],
    "Special": [
      {
        idx: 1,
        type: "Daily",
        title: "S이체하기",
        count: 2,
        total: 2,
        status: 1,
      },
      {
        idx: 2,
        type: "Daily",
        title: "S환전조회",
        count: 0,
        total: 1,
        status: 0,
      },
      {
        idx: 3,
        type: "Daily",
        title: "S먹이주기",
        count: 0,
        total: 3,
        status: 2,
      },
      {
        idx: 4,
        type: "Daily",
        title: "S운동하기",
        count: 0,
        total: 3,
        status: 0,
      },
    ],
  });

  // useEffect(() => {
  //   axios
  //     .get("http://192.168.9.30:8094/quest?userId=ssafy")
  //     .then((res) => {
  //       setQuest(res.data);
  //       console.log("quest: ", quests);
  //     })
  //     .catch((error) => {
  //       console.error("Quest 불러오기 에러 발생: ", error);
  //     });
  // }, []);

  return (
    <View style={globalStyles.container}>
      <ImageBackground source={mission} style={[globalStyles.bgImg, { alignItems: "center" }]}>
        <GameHeader />
        <MissionHeader navigation={navigation} />
        <MenuBar />
        {/* <DailyQuest /> */}
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

function determineButtonColor(status) {
  let color;
  switch (status) {
    case 0:
      color = "#FFE8BA";
      break;
    case 1:
      color = "#E5FFD4";
      break;
    case 2:
      color = "#ced4da";
      break;
  }

  return color;
}

const Tab = createMaterialTopTabNavigator();
function MenuBar() {
  return (
    <View style={{ flex: 7, width: SCREEN_WIDTH }}>
      <Tab.Navigator
        // tabBarOptions={{
        //   labelStyle: { fontSize: 12 },
        //   style: { backgroundColor: "blue" },
        // }}
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#FF3F9F",
          tabBarInactiveTintColor: "black",
          tabBarLabelStyle: { fontSize: 16 },
          tabBarStyle: { backgroundColor: "white" },
        })}
      >
        <Tab.Screen name="일간" children={() => <DailyQuest bb={quests.Daily} />} />
        <Tab.Screen name="주간" children={() => <DailyQuest bb={quests.Weekly} />} />
        <Tab.Screen name="월간" children={() => <DailyQuest bb={quests.Monthly} />} />
        <Tab.Screen name="특별" children={() => <DailyQuest bb={quests.Special} />} />
      </Tab.Navigator>
    </View>
  );
}

function DailyQuest(props) {

  // [quest, _] = useState(props.quest);
  [quest, setQuest] = useState(props.bb);

  function getQuestReward({ idx, status }) {
    console.log(quest)
    if (status === 1) {
      axios
        .post("http://192.168.9.30:8094/quest", {
          questIdx: idx,
          userId: "ssafy",
        })
        .then(() => {
          setQuest((prevQuest) => {
            const newQuest = prevQuest.map((quest) => {
              if (quest.idx === idx) {
                return { ...quest, status: 2 };
              }
  
              return quest;
            });
  
            return newQuest;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <View style={{ flex: 7, marginTop: 5 }}>
      <ScrollView>
        <View style={styles.questContainer}>
          {quest.map((quest, idx) => {
            return (
              <View key={idx} style={styles.quest}>
                <View style={styles.questTitleArea}>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>{quest.title + props.test}</Text>
                </View>
                <View style={styles.questStatusArea}>
                  <TouchableOpacity
                    onPress={getQuestReward.bind(this, quest)}
                    disabled={quest.status == 1 ? false : true}
                  >
                    <View
                      style={[
                        { width: 60, height: 42 },
                        { backgroundColor: determineButtonColor(quest.status) },
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
