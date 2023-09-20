import React, { useEffect, useState } from 'react';
import { 
  StatusBar, 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios';

import { requestGet } from '../../../common/http-common.js';
import { images } from '../../../common/imgDict.js'
import { globalStyles } from '../homestyles/global.js';
import { SCREEN_WIDTH } from '../../../common/ScreenSize.js';

import GameHeader from '../homecomponents/GameHeader.js';
import PageHeader from '../homecomponents/PageHeader.js';

export default function Mission({ navigation }) {
  [quests, setQuest] = useState([]);

  useEffect(() => {
    axios
      .get("http://j9d101a.p.ssafy.io:8094/quest?userId=ssafy")
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
      <ImageBackground source={images.Background.mission} style={[globalStyles.bgImg, { alignItems: "center" }]}>
        <GameHeader />
        <PageHeader navigation={navigation} color={'#76009F'} title={'미션'}/>
        <MenuBar quests={quests}/>
        {/* <View style={{ flex: 6.5 }}></View> */}
      </ImageBackground>
      <StatusBar />
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
function MenuBar({quests}) {
  return (
    <View style={{ flex: 6.5, width: SCREEN_WIDTH }}>
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
        {/* <Tab.Screen name="일간" component={DailyQuest} initialParams={{quest: quests, type: "Daily"}} /> */}
        <Tab.Screen name="일간" children={() => <DailyQuest quest={quests} type="Daily" />} />
        <Tab.Screen name="주간" children={() => <DailyQuest quest={quests} type="Weekly"/>} />
        <Tab.Screen name="월간" children={() => <DailyQuest quest={quests} type="Monthly"/>} />
        <Tab.Screen name="특별" children={() => <DailyQuest quest={quests} type="Specially"/>} />
      </Tab.Navigator>
    </View>
  );
}

function DailyQuest({ quest, type }) {
  // [quest, _] = useState(props.quest);
  // [quest, setQuest] = useState(quest);
  // useEffect(() => {
  //   console.log("A")
  // }, [quest])

  function getQuestReward({ idx, status }) {
    console.log(quest);
    if (status === 1) {
      axios
        .post("http://j9d101a.p.ssafy.io:8094/quest", {
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
    <View style={{ flex: 6.5, marginTop: 5 }}>
      <ScrollView>
        <View style={styles.questContainer}>
          {quest.map((quest, idx) => {
            if (quest.type === type) {
              return (
                <View key={idx} style={styles.quest}>
                  <View style={styles.questTitleArea}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{quest.title}</Text>
                  </View>
                  <View style={styles.questInfotatusArea}>
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
            }
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
  questInfotatusArea: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});
