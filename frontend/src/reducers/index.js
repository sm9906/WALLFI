import { combineReducers } from 'redux';
import cardReducer from './cardReducer';
import loadingReducer from './loadingReducer'
import battleReducer from './battleReducer';

const rootReducer = combineReducers({
  cardReducer: cardReducer,
  loadingReducer: loadingReducer,
  battleReducer:battleReducer,
});

export default rootReducer;
