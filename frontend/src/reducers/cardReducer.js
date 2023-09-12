import { SET_PLAYER_CARD, SET_PLAYER_SELECT, SET_ENEMY_CARD, SET_ENEMY_SELECT, DECREASE_CARD } from '../actions/cardActions';

const initialState = {
  playerCard: {
    attack: 2,
    defence: 2,
    counter: 2,
    exchange: 1,
    skill: 3,
  },

  playerSelect: "",

  enemyCard: {
    attack: 2,
    defence: 2,
    counter: 2,
    exchange: 1,
    skill: 3,
  },

  enemySelect: ""
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYER_CARD:
      return { ...state, playerCard: action.payload };
    case SET_PLAYER_SELECT:
      return { ...state, playerSelect: action.payload };
    case SET_ENEMY_CARD:
      return { ...state, enemyCard: action.payload };
    case SET_ENEMY_SELECT:
      return { ...state, enemySelect: action.payload };
    case DECREASE_CARD:
      
      let decreasedValue;
      if (action.payload.cardType === 'skill') {
        decreasedValue = 0;
      } else {
        decreasedValue = state[action.payload.target + 'Card'][action.payload.cardType] - 1;
      }
      return {
        ...state,
        [action.payload.target + 'Card']: {
          ...state[action.payload.target + 'Card'],
          [action.payload.cardType]: decreasedValue
        },
      };
    default:
      return state;
  }
};

export default cardReducer;
