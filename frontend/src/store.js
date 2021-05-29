import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import appReducer from "./Reducers/app"
import consoleReducer from "./Reducers/console"
import contentReducer from "./Reducers/content"
import headerReducer from "./Reducers/header"
import menuReducer from "./Reducers/menu"
import sideAreaReducer from "./Reducers/sideArea"
import tagAreaReducer from "./Reducers/tagArea"


const reducers = combineReducers({
    //app : appReducer,
    console: consoleReducer,
    content: contentReducer,
    header: headerReducer,
    menu: menuReducer,
    sideArea: sideAreaReducer,
    tagArea: tagAreaReducer,
    
})
export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
