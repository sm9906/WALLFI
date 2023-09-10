import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../homecomponents/ScreenSize.js';
import IMG_URL from '../../.././assets/characters/default/default_4.png';
import coin from '../../.././assets/game/icon/coin.png'

function GameHeader(props) {

    return (
        <View style={styles.header}>
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <View style={styles.headerItem}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Image source={IMG_URL} style={styles.profile}></Image>
                    </View>
                    <Text style={styles.name}>김싸피</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                        width: '85%',
                        height: '40%',
                        backgroundColor: '#D9D9D9',
                        borderRadius: 15,
                    }}></View>
                </View>
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
                    <View style={styles.headerRight}>
                        <View style={styles.rightTopBox}>
                            <Image source={coin} style={{ resizeMode: 'contain', height: '85%', width: '20%' }} />
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', height: '85%', marginEnd: '10%' }}> 10억$</Text>
                        </View>
                    </View>
                    <View style={styles.headerRight}>
                        <View style={styles.rightBottomBox}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white', height: '70%' }}>달러 : 1300</Text>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'red', height: '70%' }}> (▲ 0.15)</Text>
                        </View>
                    </View>
            </View>
        </View>
    );
};

export default GameHeader;

const styles = StyleSheet.create({
    header: {
        flex: 1,
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        backgroundColor: 'rgba(41, 54, 148, 0.8)',
    },
    headerItem: { 
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile: { 
        width: '65%',
        height: '80%',
        backgroundColor: '#0F6828',
        borderRadius: 20,
        borderColor: '#5C4800',
        borderWidth: 2,
        resizeMode: 'contain',
        marginTop: '10%',
    },
    name: {
        flex: 1.5,
        fontWeight: 'bold',
        fontSize: 25,
        color: 'white',
        textShadowColor: '#272B49',
        textShadowRadius: 2,
        textShadowOffset: { width: 2, height: 2 },
        elevation: 1,
    },
    headerRight: { 
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    rightTopBox: { 
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#758DCC',   
        height: '80%',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '10%',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#505A75'
    },
    rightBottomBox: { 
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#758DCC',   
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10%',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#505A75'
    },
});