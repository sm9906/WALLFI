import { combineReducers } from 'redux';
import cardReducer from './cardReducer';
import loadingReducer from './loadingReducer'
import turnReducer from './turnReducer';

const rootReducer = combineReducers({
  cardReducer: cardReducer,
  loadingReducer: loadingReducer,
  turnReducer: turnReducer,
});

export default rootReducer;
