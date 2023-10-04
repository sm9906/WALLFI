import { SET_ENEMY, SET_PLAYER, RESET_ANIMAL } from "../actions/animalAction";

const initialState = {
  player: {
    animal: "TIGER",
    Level: 1,
    exp: 0,
    Hp: 50,
    attack: 2,
    defence: 2,
    exchange: 1,
    color: "BASIC"
  },

  enemy: {
    animal: "TIGER",
    Level: 1,
    exp: 0,
    Hp: 50,
    attack: 2,
    defence: 2,
    exchange: 1,
    color: "BASIC"
  },
};

const animalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ENEMY:
      return { 
        ...state, 
        enemy: {
          ...state.enemy,
          animal: action.stat.animal || state.enemy.animal,
          Level: action.stat.Level || state.enemy.Level,
          exp: action.stat.exp || state.enemy.exp,
          Hp: action.stat.Hp || state.enemy.Hp,
          attack: action.stat.attack || state.enemy.attack,
          defence: action.stat.defence || state.enemy.defence,
          exchange: action.stat.exchange || state.enemy.exchange,
          color: action.stat.color || state.enemy.color,
        }
      };
    case SET_PLAYER:
      return { 
        ...state, 
        player: {
          ...state.player,
          animal: action.stat.animal || state.player.animal,
          Level: action.stat.Level || state.player.Level,
          exp: action.stat.exp || state.player.exp,
          Hp: action.stat.Hp || state.player.Hp,
          attack: action.stat.attack || state.player.attack,
          defence: action.stat.defence || state.player.defence,
          exchange: action.stat.exchange || state.player.exchange,
          color: action.stat.color || state.player.color,
        }
      };
    case RESET_ANIMAL:
      return {
        ...state,
        enemy: {
          animal: "TIGER",
          Level: 1,
          exp: 0,
          Hp: 50,
          attack: 2,
          defence: 2,
          exchange: 1,
          color: "BASIC"
        },
      };
    default:
      return state;
  }
};

export default animalReducer;
