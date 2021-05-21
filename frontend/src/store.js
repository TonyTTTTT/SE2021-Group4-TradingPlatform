import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import navigationBarReducer from "./Reducers/navigationBar";

const reducers = combineReducers({
    navigationBar: navigationBarReducer
})
export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));