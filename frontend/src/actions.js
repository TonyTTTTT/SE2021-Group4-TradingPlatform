import {ADD_LOG} from "./constant";

export const setAlgoAction = payload => ({type: "SET_SELECTED_ALGO_ID", payload})

export const sendLogAction = payload => ({type: ADD_LOG, payload})