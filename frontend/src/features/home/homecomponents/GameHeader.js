import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../homecomponents/ScreenSize.js';
import IMG_URL from '../../.././assets/characters/default/default_4.png';

function GameHeader(props) {

    return (
        <View style={styles.header}>
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <View style={styles.headerItem}>
                    <View style={{ flex: 1, alignItems: 'center', padding: '2%' }}>
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
                    <View style={{ flex: 1, flexDirection: 'row' }}>

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        
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
        width: '75%',
        height: '100%',
        backgroundColor: '#0F6828',
        borderRadius: 20,
        borderColor: '#5C4800',
        borderWidth: 2,
        resizeMode: 'contain',
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
    }
});