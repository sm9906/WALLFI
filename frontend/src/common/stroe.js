import { createStore } from 'redux';
import rootReducer from '../reducers/counter';

const store = createStore(rootReducer);

export default store;
