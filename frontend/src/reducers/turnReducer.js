import { SET_TURN, SET_GUIDE, SET_END_GAME, SET_RESULT, RESET_TURN } from "../actions/turnActions";

const initialState = {
    turn: 0,
    guide: false,
    end: false,
    res: ""
};

const turnReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TURN:
            return { ...state, turn: action.turn };
        case SET_GUIDE:
            return { ...state, guide: action.res };
        case SET_END_GAME:
            return { ...state, end: action.end };
        case SET_RESULT:
            return { ...state, res: action.res };
        case RESET_TURN:
            return {
                turn: 0,
                guide: false,
                end: false,
                res: ""
            }
        default:
            return state;
    }
};

export default turnReducer;
