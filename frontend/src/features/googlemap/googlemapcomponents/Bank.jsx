import { requestPost } from "../../../lib/api/Api";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

// 보류

url = "/v1/search/branch/list";

export default function bank() {
  const [bankPosition, setBankPosition] = useState(null);

  useEffect(() => {
    const params = {
      dataHeader: {
        apikey: "2023_Shinhan_SSAFY_Hackathon",
      },
      dataBody: {
        serviceCode: "T0508",
        시도명: "서울",
      },
    };

    requestPost(url, params)
      .then((res) => {
        console.log(res.data.dataBody.리스트);
        setBankPosition(res.data.dataBody.리스트.length());
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <View>
      <Text>hi</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
