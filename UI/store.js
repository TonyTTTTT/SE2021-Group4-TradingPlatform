import { createStore, applyMiddleware } from 'redux';
import reducers from './Reducers/index';
export default createStore(reducers);