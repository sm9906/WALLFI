import { SET_WIN_CARD } from "../actions/battleActions";

const initialState = {
  winCard: ""
}

const battleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WIN_CARD:
      return { ...state, winCard: action.payload };

    default:
      return state;
  }
};

export default battleReducer;
