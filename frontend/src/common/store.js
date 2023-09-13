import { combineReducers, configureStore } from '@reduxjs/toolkit';
import homeReducer from '../features/home/homeSlice.js';

const rootReducer = combineReducers({
  home: homeReducer,
})

const store = configureStore({
  reducer: rootReducer
});

export default store;