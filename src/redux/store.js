import {createStore, combineReducers} from 'redux';
import {Language} from './reducers';

const store = createStore(Language);

export default store;