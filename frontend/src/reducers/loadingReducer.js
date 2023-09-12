import { SET_BATTLE_LOADING } from "../actions/loadingActions";

const initialState = {
  battleLoading: false
}

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BATTLE_LOADING:
      return { ...state, battleLoading: action.payload };

    default:
      return state;
  }
};

export default loadingReducer;
