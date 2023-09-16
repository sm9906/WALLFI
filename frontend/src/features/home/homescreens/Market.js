import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    Modal,
    Alert,
} from 'react-native';
import { images } from '../../../common/imgDict.js'
import { globalStyles } from "../homestyles/global.js";
import GameHeader from '../homecomponents/GameHeader.js';
import { useDispatch, useSelector } from 'react-redux';
import { changeColor, getRandomCharacter, updatePoint } from '../homeSlice.js';

const typeList = {
    EAGLE: '독수리',
    LION: '사자',
    PANDA: '판다',
    QUOKKA: '쿼카',
    SHIBA: '시바',
    TIGER: '호랑이',
}

export default function Market({navigation}) {

    const [selectedBtn, setSelectedBtn] = useState(1);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    
    return (
        <View style={globalStyles.container}>
            <ImageBackground source={images.Background.market} style={[globalStyles.bgImg, { alignItems: 'center' }]}>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={modalVisible1}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible1(!modalVisible1);
                }}>
                    <OneEgg modalVisible1={modalVisible1} 
                    setModalVisible1={setModalVisible1} 
                    selectedCharacter={selectedCharacter}
                    setSelectedCharacter={setSelectedCharacter}
                />
                </Modal>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={modalVisible2}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible2(!modalVisible2);
                }}>
                    <TenEgg modalVisible2={modalVisible2} setModalVisible2={setModalVisible2}/>
                </Modal>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={modalVisible3}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible3(!modalVisible3);
                }}>
                    <Color 
                        modalVisible3={modalVisible3} 
                        setModalVisible3={setModalVisible3}
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                    />
                </Modal>
                <GameHeader />
                <MarketHeader navigation={navigation}/>
                <View style={styles.buttonBox}>
                    <TouchableOpacity
                        onPress={() => setSelectedBtn(1)}
                        style={[styles.btnStyle, {backgroundColor: selectedBtn === 1 ? '#138383' : '#00B1B1'}]}
                    >
                        <Text style={styles.btnText}>🥚 동물 알 뽑기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setSelectedBtn(2)}
                        style={[styles.btnStyle, {backgroundColor: selectedBtn === 2 ? '#138383' : '#00B1B1'}]}
                    >
                        <Text style={styles.btnText}>🎨 동물 색상 뽑기</Text>
                    </TouchableOpacity>
                </View>
                <RenderContent 
                    selectedBtn={selectedBtn} 
                    setSelectedBtn={setSelectedBtn} 
                    modalVisible={modalVisible1} 
                    setModalVisible1={setModalVisible1}
                    modalVisible2={modalVisible2}
                    setModalVisible2={setModalVisible2}
                    modalVisible3={modalVisible3}
                    setModalVisible3={setModalVisible3}
                    selectedCharacter={selectedCharacter}
                    setSelectedCharacter={setSelectedCharacter}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                />
            </ImageBackground>
            <StatusBar />
        </View>
    )
}

function MarketHeader(props) {
    
    return (
        <View style={{ flex: 1.2, flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={[globalStyles.navigationBtn, { backgroundColor: '#FFC700' }]} onPress={() => props.navigation.navigate('GameHome')}>
                <Image source={images.btnSource.backHome} style={globalStyles.btnIcon}/>
            </TouchableOpacity>
            <Text style={[globalStyles.navigationText, { color: '#FFC700' }]}>상점</Text>
        </View>
    );
}

function RenderContent(props) {

    const userId = useSelector(state=>state.auth.userId);
    const mainCharacter = useSelector(state=>state.home.mainCharacter);
    const userInfo = useSelector(state=>state.home.userGameInfo);
    const dispatch = useDispatch();

    const randomCharacter = async() => {
        try {

            if (userInfo.point < 1000) {
                Alert.alert(
                    '경고',
                    '포인트가 부족합니다!',
                    [
                      {text:'확인', onPress: ()=> {}, style:'default'}
                    ]
                );
            } else {
                console.log('알 1개 뽑기 들어왔다');
                dispatch(updatePoint({point: -1000, userId: userId})).then(res => console.log(res))
                dispatch(getRandomCharacter(userId))
                .then((response) => {
                    console.log('랜덤 캐릭터 1개 뽑기 성공', response);
                    props.setSelectedCharacter(response.payload);
                    props.setModalVisible1(true);
                });
            }
        } catch (err) {
            console.log('randomCharacter', err);
        }
    }

    const randomColor = async () => {
        try {

            if (userInfo.point < 3000) {
                Alert.alert(
                    '경고',
                    '포인트가 부족합니다!',
                    [
                      {text:'확인', onPress: ()=> {}, style:'default'}
                    ]
                );
            } else {
                console.log('색 바꾸기 들어왔다');
                dispatch(updatePoint({point: -3000, userId: userId})).then(res => console.log(res))
                dispatch(changeColor({mainCharacterIdx: mainCharacter.characterIdx, userId: userId}))
                .then((response) => {
                    console.log('랜덤 색 뽑기 성공', response);
                    props.setSelectedColor(response.payload);
                    props.setModalVisible3(true);
                });
            }

        } catch (err) {
            console.log('color', err)
        }
    }

    if (props.selectedBtn === 1) {
        return (
          <View style={styles.marketContent}>
            <View style={{ flex: 3.5, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={images.marketSource.egg} style={{ resizeMode: 'contain', height: '65%', width: '50%', marginBottom: '10%' }}/>
            </View>
            <View style={styles.bottom}>
                <View style={styles.bottomItems}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>🥚 X 1</Text>
                    <TouchableOpacity 
                        style={styles.puchaseBtn} 
                        onPress={() => {randomCharacter()}}>
                        <Image source={images.gameIcon.coin} style={styles.coinIcon}/>
                        <Text style={styles.coinText}>1,000</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomItems}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>🥚 X 10</Text>
                    <TouchableOpacity 
                        style={styles.puchaseBtn}
                        onPress={() => {
                            props.setModalVisible2(true)
                    }}>
                        <Image source={images.gameIcon.coin} style={styles.coinIcon}/>
                        <Text style={styles.coinText}>9,000</Text>
                    </TouchableOpacity>
                </View>
            </View>
          </View>
        );
      }
  
      if (props.selectedBtn === 2) {
        return (
          <View style={styles.marketContent}>
            <View style={{ flex: 3.5, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={images.marketSource.color} style={{ resizeMode: 'contain', height: '120%', width: '100%', marginBottom: '10%' }}/>
            </View>
            <View style={styles.bottom}>
                <View style={[styles.bottomItems, { flex: 0.45 }]}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>🎨 X 1</Text>
                    <TouchableOpacity 
                        style={styles.puchaseBtn}
                        onPress={() => {randomColor()}
                    }>
                        <Image source={images.gameIcon.coin} style={styles.coinIcon}/>
                        <Text style={styles.coinText}>3,000</Text>
                    </TouchableOpacity>
                </View>
            </View>
          </View>
        );
      }
}

function OneEgg(props) {

    console.log('모달들어옴', props.selectedCharacter);
    const type = props.selectedCharacter.characterType;

    return(
        <View style={styles.modalStyle}>
            <View style={styles.modalBox}>
                <View style={{
                    width: '80%',
                    height: '80%',
                    backgroundColor: 'white',
                    borderRadius: 15
                }}>
                    <Image source={images.eggs[type]} style={{
                        width: '100%',
                        height: '100%',
                    }}/>
                </View>
            </View>
            <Text style={{ 
                flex: 1,
                fontSize: 20,
                fontWeight: 'bold'
            }}>
                {typeList[type]}알을 획득했습니다!
            </Text>
            <TouchableOpacity
                style={styles.okBtn}
                onPress={() => props.setModalVisible1(false)}
            >
                <Text style={styles.okText}>확인</Text>
            </TouchableOpacity>
        </View>
    )
}

function TenEgg(props) {
    
    const images = [
        { id: 1, imageUrl: require('../../.././assets/eggs/australia_egg.png')},
        { id: 2, imageUrl: require('../../.././assets/eggs/australia_egg.png')},
        { id: 3, imageUrl: require('../../.././assets/eggs/australia_egg.png')},
        { id: 4, imageUrl: require('../../.././assets/eggs/australia_egg.png')},
        { id: 5, imageUrl: require('../../.././assets/eggs/australia_egg.png')},
        { id: 6, imageUrl: require('../../.././assets/eggs/australia_egg.png')},
        { id: 7, imageUrl: require('../../.././assets/eggs/australia_egg.png')},
        { id: 8, imageUrl: require('../../.././assets/eggs/australia_egg.png')},
        { id: 9, imageUrl: require('../../.././assets/eggs/australia_egg.png')},
        { id: 10, imageUrl: require('../../.././assets/eggs/australia_egg.png')},
        { id: 11, imageUrl: null},
        { id: 12, imageUrl: null},
    ];

    const arr = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 12]
    ];

    const GridWithImages = () => {
        return (
            <View style={{
                flex: 0.95,
                width: '95%',
                flexDirection: 'column',
                justifyContent:'center',
                alignItems: 'center',
            }}>
                { arr.map((row, i) => (
                    <View key={i} style={{ 
                        flex: 1, 
                        width: '95%', 
                        flexDirection: 'row', 
                        marginVertical: '2%',
                    }}>
                        { row.map((item) => (
                                <View key={item} style={{ 
                                    flex: 1, 
                                    height: '100%', 
                                    backgroundColor: 'white', 
                                    alignItems: 'center',
                                    marginHorizontal: '2%',
                                    borderRadius: 10
                                }}>
                                    <Image source={images[item - 1].imageUrl} style={{
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'contain'
                                    }} />
                                </View>
                        ))}
                    </View>
                ))}
            </View>
        )
    }

    return(
        <View style={styles.modalStyle}>
            <View style={styles.modalBox}>
                <GridWithImages />
            </View>
            <TouchableOpacity
                style={styles.okBtn}
                onPress={() => props.setModalVisible2(false)}
            >
                <Text style={styles.okText}>확인</Text>
            </TouchableOpacity>
        </View>
    )
}

function Color(props) {
    console.log('색뽑기 모달창 들어왔다', props.selectedColor);
    const type = props.selectedColor.characterType;
    const color = props.selectedColor.color;

    const colorList = {
        MINT: '민트',
        WHITE: '하얀',
        BASIC: '기본',
        LEGEND: '레전드'
    }

    return(
        <View style={styles.modalStyle}>
            <View style={styles.modalBox}>
                <View style={{
                    width: '80%',
                    height: '80%',
                    backgroundColor: 'white',
                    borderRadius: 15
                }}>
                    <Image source={images.defaultCharacter[type][color]} 
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
            </View>
            <Text style={{ 
                flex: 1,
                fontSize: 20,
                fontWeight: 'bold'
            }}>
                {colorList[color]}색이 적용되었습니다!
            </Text>
            <TouchableOpacity
                style={styles.okBtn}
                onPress={() => props.setModalVisible3(false)}
            >
                <Text style={styles.okText}>확인</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonBox: { 
        flex: 1.5,
        width: '85%',
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnStyle: {
        flex: 1,
        height: '30%',
        marginHorizontal: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#007272',
    },
    btnText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: '#0E6F6F',
        textShadowOffset: { width: 2, height: 1 },
        textShadowRadius: 2,
    },
    marketContent: { 
        flex: 5, 
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    bottom: { 
        flex: 1.5,
        flexDirection: 'row',
        width: '100%', 
        backgroundColor: 'rgba(159, 164, 208, 0.8)' ,
        borderWidth: 1,
        borderColor: 'rgba(126, 144, 189, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomItems: {
        flex: 1,
        height: '75%',
        flexDirection: 'column',
        backgroundColor: '#BCCADE',
        marginHorizontal: '5%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(102, 111, 137, 0.8)',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    puchaseBtn: {
        flex: 0.5,
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00B1B1',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(157, 141, 98, 0.59)'
    },
    coinIcon: { 
        resizeMode: 'contain', 
        width: '30%', 
        height: '60%', 
        marginRight: '5%' 
    },
    coinText: {
        fontWeight: 'bold',
        textShadowColor: 'white',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    modalStyle: {
        flex: 1,
        width: '90%',
        backgroundColor: 'rgba(255, 253, 210, 0.94)',
        marginHorizontal: '5%',
        marginVertical: '30%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBox: { 
        flex: 5, 
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    okBtn: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    okText: {
        height: '60%',
        width: '30%',
        backgroundColor: '#FFC700',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 10
    }
})