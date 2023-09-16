import { useRef, useState, useEffect, useMemo } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import { getExchangeInfo } from "../homeSlice.js";
import { images } from "../../../common/imgDict.js";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../homecomponents/ScreenSize.js";
import { AntDesign } from '@expo/vector-icons';
import { RFPercentage } from "react-native-responsive-fontsize";


const data = { 
    "exchangeDtoList": [
    {
      "통화코드": "USD",
      "통화명": "미국 달러",
      "전신환매입환율": 1275.2,
      "전신환매도환율": 1299.8,
      "지폐매입환율": 1264.97,
      "지폐매도환율": 1310.03,
      "매매기준환율": 1287.5,
      "전일대비": -1
    },
    {
      "통화코드": "JPY",
      "통화명": "일본 100엔",
      "전신환매입환율": 891.96,
      "전신환매도환율": 909.24,
      "지폐매입환율": 884.84,
      "지폐매도환율": 916.36,
      "매매기준환율": 900.6,
      "전일대비": 1.45
    },
    {
      "통화코드": "EUR",
      "통화명": "유럽 유로",
      "전신환매입환율": 1399.19,
      "전신환매도환율": 1426.87,
      "지폐매입환율": 1385.06,
      "지폐매도환율": 1441,
      "매매기준환율": 1413.03,
      "전일대비": -1.73
    }
  ]}


function ShwoExchange({통화코드:ntnCode, 매매기준환율:exchangeRate, 전일대비:compareDt}){
    const sholdShowCreatedown = compareDt<0;
    const trim_compareDt = sholdShowCreatedown? compareDt*-1: compareDt
    // const num_exchangeRate = exchangeRate.toLocaleString('es-US')
    return(
      <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', paddingHorizontal:'10%', alignItems:'center'}} >
        <View>
            <Text style={{color:'white', fontWeight:'bold'}}>{ntnCode+' '}</Text>
        </View>
        <Text style={{color:'white', fontWeight:'bold'}} >{exchangeRate+ ' '}</Text>
        <View style={{flexDirection:'row', alignItems:'center'}}>{sholdShowCreatedown?
            (<AntDesign name="caretdown" size={RFPercentage(1)}  color="#293694"/>):(<AntDesign name="caretup" size={RFPercentage(1)} color="red" />)}
            <Text style={{color:sholdShowCreatedown?'#293694':'red', fontWeight:'bold'}}>{`(${trim_compareDt})`}</Text>
        </View>
      </View>
    )
}


const TextTransition = (props) => {
    const exchanges = data["exchangeDtoList"];
    const [currentId, setCurrentId] = useState(0);
    const exlength = exchanges.length
    // console.log(exlength)
    useEffect(() => {
      const timeout = setInterval(() => {
        setCurrentId((prev) => (prev+1)%exlength)
      }, 1000); // 3초마다 텍스트 변경

      return () => clearTimeout(timeout);
    }, [currentId]);

    return (
      <View style={styles.rightBottomBox}>
        <ShwoExchange  {...exchanges[currentId]}/>
      </View>
    );
  };



function GameHeader(props) {
  console.log("header");
  const [userInfo, setUserInfo] = useState("");
  const [exchange, setExchange] = useState([]);

//   const textRef1 = useRef("");
//   const textRef2 = useRef("");
//   const [currentText, setCurrentText] = useState(0);

//   let texts = [];


  const gameUser = useSelector((state) => state.home.userGameInfo);

  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await dispatch(getExchangeInfo()).then((res) => {
        let data = res.payload;
        let copy = [...data];

        setExchange(copy);
        setUserInfo({ name: gameUser.userId, point: gameUser.point });
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {exchange.length > 0 && (
        <View style={styles.header}>
          <View style={{ flexDirection: "column", flex: 1 }}>
            <View style={styles.headerItem}>
              {/* <View style={{ flex: 1, alignItems: 'center' }}>
                                <Image source={images.defaultCharacter.TIGER.MINT} style={styles.profile}></Image>
                            </View> */}
              <Text style={styles.name}>{userInfo.name}</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "85%",
                  height: "40%",
                  backgroundColor: "#D9D9D9",
                  borderRadius: 15,
                }}
              ></View>
            </View>
          </View>
          <View style={{ flexDirection: "column", flex: 1 }}>
            <View style={styles.headerRight}>
              <View style={styles.rightTopBox}>
                <Image
                  source={images.gameIcon.coin}
                  style={{ resizeMode: "contain", height: "85%", width: "20%" }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "white",
                    height: "85%",
                    marginEnd: "10%",
                  }}
                >
                  {" "}
                  {userInfo.point}$
                </Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <TextTransition/>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

export default GameHeader;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: SCREEN_WIDTH,
    flexDirection: "row",
    backgroundColor: "rgba(41, 54, 148, 0.8)",
  },
  headerItem: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  // profile: {
  //     width: '65%',
  //     height: '85%',
  //     backgroundColor: '#0F6828',
  //     borderRadius: 20,
  //     borderColor: '#5C4800',
  //     borderWidth: 2,
  //     resizeMode: 'contain',
  //     marginTop: '10%',
  // },
  name: {
    flex: 1.5,
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    textShadowColor: "#272B49",
    textShadowRadius: 2,
    textShadowOffset: { width: 2, height: 2 },
    elevation: 1,
    marginTop: "5%",
    marginStart: "10%",
  },
  headerRight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rightTopBox: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#758DCC",
    height: "80%",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: "10%",
    marginTop: "3%",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#505A75",
  },
  rightBottomBox: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#758DCC",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "10%",
    marginBottom: "3%",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#505A75",
  },
});
