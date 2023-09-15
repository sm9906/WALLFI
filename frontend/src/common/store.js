import {combineReducers, configureStore} from '@reduxjs/toolkit';
import walletReducer from '../features/wallet/walletSlice'
import homeReducer from '../features/home/homeSlice.js';
import authReducer from '../features/auth/authSlice';
import cardReducer from '../reducers/cardReducer';
import loadingReducer from '../reducers/loadingReducer';
import turnReducer from '../reducers/turnReducer';
import animalReducer from '../reducers/animalReducer';
import Reactotron from '../../ReactotronConfig';
import { createStore  } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  wallet:walletReducer,
  auth: authReducer,
  cardReducer: cardReducer,
  loadingReducer: loadingReducer,
  turnReducer: turnReducer,
  animalReducer: animalReducer,
  home: homeReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
  devTools: true,
  enhancers: [Reactotron.createEnhancer()]
});

export default store;