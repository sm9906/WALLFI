import home from '../assets/background/home.png';
import collection from '../assets/background/collection.png';
import market from '../assets/background/market.png';
import mission from '../assets/background/mission.png';

import eagle_basic from '../assets/characters/home/EAGLE_HOME/BABY_EAGLE_NORMAL.png';
import eagle_white from '../assets/characters/home/EAGLE_HOME/BABY_EAGLE_EPIC.png';
import eagle_mint from '../assets/characters/home/EAGLE_HOME/BABY_EAGLE_UNIQUE.png';
import eagle_legend from '../assets/characters/home/EAGLE_HOME/BABY_EAGLE_LEGEND.gif';

import lion_basic from '../assets/characters/home/LION_HOME/BABY_LION_NORMAL.png';
import lion_white from '../assets/characters/home/LION_HOME/BABY_LION_EPIC.png';
import lion_mint from '../assets/characters/home/LION_HOME/BABY_LION_UNIQUE.png';
import lion_legend from '../assets/characters/home/LION_HOME/BABY_LION_LEGEND.gif';

import panda_basic from '../assets/characters/home/PANDA_HOME/BABY_PANDA_NORMAL.png';
import panda_white from '../assets/characters/home/PANDA_HOME/BABY_PANDA_EPIC.png';
import panda_mint from '../assets/characters/home/PANDA_HOME/BABY_PANDA_UNIQUE.png';
import panda_legend from '../assets/characters/home/PANDA_HOME/BABY_PANDA_LEGEND.gif';

import quokka_basic from '../assets/characters/home/QUOKKA_HOME/BABY_QUOKKA_NORMAL.png';
import quokka_white from '../assets/characters/home/QUOKKA_HOME/BABY_QUOKKA_EPIC.png';
import quokka_mint from '../assets/characters/home/QUOKKA_HOME/BABY_QUOKKA_UNIQUE.png';
import quokka_legend from '../assets/characters/home/QUOKKA_HOME/BABY_QUOKKA_LEGEND.gif';

import siba_basic from '../assets/characters/home/SIBA_HOME/BABY_SIBA_NORMAL.png';
import siba_white from '../assets/characters/home/SIBA_HOME/BABY_SIBA_EPIC.png';
import siba_mint from '../assets/characters/home/SIBA_HOME/BABY_SIBA_UNIQUE.png';
import siba_legend from '../assets/characters/home/SIBA_HOME/BABY_SIBA_LEGEND.gif';

import tiger_basic from '../assets/characters/home/TIGER_HOME/BABY_TIGER_NORMAL.png';
import tiger_white from '../assets/characters/home/TIGER_HOME/BABY_TIGER_EPIC.png';
import tiger_mint from '../assets/characters/home/TIGER_HOME/BABY_TIGER_UNIQUE.png';
import tiger_legend from '../assets/characters/home/TIGER_HOME/BABY_TIGER_LEGEND.gif';

import eat_eagle from '../assets/characters/eat/eat_1.gif';
import eat_lion from '../assets/characters/eat/eat_2.gif';
import eat_panda from '../assets/characters/eat/eat_3.gif';
import eat_quokka from '../assets/characters/eat/eat_4.gif';
import eat_siba from '../assets/characters/eat/eat_5.gif';
import eat_tiger from '../assets/characters/eat/eat_6.gif';

import australia from '../assets/eggs/australia_egg.png';
import china from '../assets/eggs/china_egg.png';
import europe from '../assets/eggs/europe_egg.png';
import japan from '../assets/eggs/japan_egg.png';
import korea from '../assets/eggs/korea_egg.png';
import usa from '../assets/eggs/usa_egg.png';

import backHomeBtn from '../assets/game/button/backHome.png';
import collectionBtn from '../assets/game/button/collection.png';
import battleBtn from '../assets/game/button/dailyChallenge.png';
import eatBtn from '../assets/game/button/eat.png';
import mapBtn from '../assets/game/button/map.png';
import marketBtn from '../assets/game/button/market.png';
import missionBtn from '../assets/game/button/mission.png';
import modalCloseBtn from '../assets/game/button/modalClose.png';
import noticeBtn from '../assets/game/button/notice.png';
import trainingBtn from '../assets/game/button/training.png';
import walletBtn from '../assets/game/button/wallet.png';

import coinIcon from '../assets/game/icon/coin.png';
import trophyIcon from '../assets/game/icon/trophy.png';

import color from '../assets/game/market/characterColor.gif';
import marketEgg from '../assets/game/market/marketEgg.png';

export const images = {
    background: {
        home: home,
        collection: collection,
        market: market,
        mission: mission
    },

    defaultCharacter: {
        EAGLE: {
            BASIC: eagle_basic,
            WHITE: eagle_white,
            MINT: eagle_mint,
            LEGEND: eagle_legend
        },
    
        LION: {
            BASIC: lion_basic,
            WHITE: lion_white,
            MINT: lion_mint,
            LEGEND: lion_legend
        },
    
        PANDA: {
            BASIC: panda_basic,
            WHITE: panda_white,
            MINT: panda_mint,
            LEGEND: panda_legend
        },
    
        QUOKKA: {
            BASIC: quokka_basic,
            WHITE: quokka_white,
            MINT: quokka_mint,
            LEGEND: quokka_legend
        },
    
        SHIBA: {
            BASIC: siba_basic,
            WHITE: siba_white,
            MINT: siba_mint,
            LEGEND: siba_legend
        },
    
        TIGER: {
            BASIC: tiger_basic,
            WHITE: tiger_white,
            MINT: tiger_mint,
            LEGEND: tiger_legend
        }
    },

    eatCharacter: {
        EAGLE: eat_eagle,
        LION: eat_lion,
        PANDA: eat_panda,
        QUOKKA: eat_quokka,
        SHIBA: eat_siba,
        TIGER: eat_tiger
    },

    eggs: {
        QUOKKA: australia,
        PANDA: china,
        LION: europe,
        SIBA: japan,
        TIGER: korea,
        EAGLE: usa    
    },

    btnSource: {
        backHome: backHomeBtn,
        collection: collectionBtn,
        battle: battleBtn,
        eat: eatBtn,
        map: mapBtn,
        market: marketBtn,
        mission: missionBtn,
        modalClose: modalCloseBtn,
        notice: noticeBtn,
        training: trainingBtn,
        wallet: walletBtn
    },

    gameIcon: {
        coin: coinIcon,
        trophy: trophyIcon
    },

    marketSource: {
        color: color,
        egg: marketEgg
    }
}