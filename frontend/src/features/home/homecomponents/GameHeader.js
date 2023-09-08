import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../homecomponents/ScreenSize.js';
import IMG_URL from '../../.././assets/background/home.png'

function GameHeader(props) {

    return (
        <View style={styles.header}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.headerItem}>
                    <View style={{width: '50%'}}>
                        <Image source={IMG_URL} style={styles.profile}></Image>
                    </View>
                    <Text style={styles.name}>김싸피</Text>
                </View>
            </View>
            <View></View>
            <View style={{ flexDirection: 'column' }}>

            </View>
        </View>
    );
};

export default GameHeader;

const styles = StyleSheet.create({
    header: {
        flex: 1.3,
        flexDirection: 'column',
        backgroundColor: 'rgba(41, 54, 148, 0.8)',
    },
    headerItem: { 
        flexDirection: 'row', 
        marginTop: '5%', 
        marginStart: '5%',
        alignItems: 'center',
    },
    profile: { 
        width: '20%',
        height: '20%',
        padding: '20%',
        borderRadius: 5,
        resizeMode: 'contain',
    },
    name: {
        
    }
});