import { combineReducers } from 'redux';
import cardReducer from './cardReducer';
import loadingReducer from './loadingReducer'
import turnReducer from './turnReducer';
import animalReducer from './animalReducer';

const rootReducer = combineReducers({
  cardReducer: cardReducer,
  loadingReducer: loadingReducer,
  turnReducer: turnReducer,
  animalReducer: animalReducer,
});

export default rootReducer;
