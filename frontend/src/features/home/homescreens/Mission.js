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
  [quests, setQuest] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.9.30:8094/quest?userId=ssafy")
      .then((res) => {
        setQuest(res.data);
        console.log("quest: ", quests);
      })
      .catch((error) => {
        console.error("Quest 불러오기 에러 발생: ", error);
      });
  }, []);

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

function getQuestReward({ idx, status }) {
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
