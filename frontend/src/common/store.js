import {combineReducers, configureStore} from '@reduxjs/toolkit';

import walletReducer from '../features/wallet/walletSlice'
import authReducer from '../features/auth/authSlice';

const rootReducer = combineReducers({
  wallet:walletReducer,
  auth: authReducer
})

const store = configureStore({
  reducer:rootReducer
})

export default store;