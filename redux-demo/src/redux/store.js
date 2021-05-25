import {applyMiddleware, combineReducers, createStore} from "redux";
import countReducer from './reducers/count'
import thunk from "redux-thunk";
import personReducer from "./reducers/person";
import {composeWithDevTools} from "redux-devtools-extension";

const allReducer = combineReducers({
    count: countReducer,
    persons: personReducer
})

export default createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)));