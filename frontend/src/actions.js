import {ADD_LOG, SET_RESULT} from "./constant";

export const setAlgoAction = payload => ({type: "SET_SELECTED_ALGO_ID", payload})

export const sendLogAction = payload => ({type: ADD_LOG, payload})