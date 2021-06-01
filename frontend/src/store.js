import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import consoleReducer from "./Reducers/console"
import headerReducer from "./Reducers/header"
import menuReducer from "./Reducers/menu"
import sideAreaReducer from "./Reducers/sideArea"
import tagAreaReducer from "./Reducers/tagArea"


const reducers = combineReducers({
    //app : appReducer,
    console: consoleReducer,
    header: headerReducer,
    menu: menuReducer,
    sideArea: sideAreaReducer,
    tagArea: tagAreaReducer,
    
})
export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
