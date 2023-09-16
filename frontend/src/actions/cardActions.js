export const SET_PLAYER_CARD = 'SET_PLAYER_CARD';
export const SET_PLAYER_SELECT = 'SET_PLAYER_SELECT';
export const SET_ENEMY_CARD = "SET_ENEMY_CARD";
export const SET_ENEMY_SELECT = "SET_ENEMY_SELECT";
export const SET_EXCHANGE_CARD = "SET_EXCHANGE_CARD"
export const DECREASE_CARD = "DECREASE_CARD";
export const INCREASE_SKILL_CARD = "INCREASE_SKILL_CARD";
export const RESET_CARD = "RESET_CARD";

export const setPlayerCard = (cardType) => ({
  type: SET_PLAYER_CARD,
  payload: cardType
});

export const setPlayerSelect = (cardInfo) => ({
  type: SET_PLAYER_SELECT,
  payload: cardInfo
});

export const setEnemyCard = (cardType) => {
  return {
    type: SET_ENEMY_CARD,
    payload: cardType
  }
}

export const setEnemySelect = (cardInfo) => {
  return {
    type: SET_ENEMY_SELECT,
    payload: cardInfo
  }
}

export const setExchangeCard = (exc, target = 'player') => {
  let exchangeValue;
  if (exc > 1) {
    exchangeValue = 1;
  } else if (exc === 1) {
    exchangeValue = 2;
  } else {
    exchangeValue = 3;
  }
}

export const decreaseCard = (cardType, target = 'player') => {
  return {
    type: DECREASE_CARD,
    payload: {
      cardType,
      target
    },
  };
};

export const resetCard = (reset) => {
  return {
    type: RESET_CARD,
    reset
  }
}