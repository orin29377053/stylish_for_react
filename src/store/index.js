import { createStore } from 'redux';
import todoReducer from '../reducer/stylish';

const store = createStore(todoReducer);

export default store;