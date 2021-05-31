import { contentState } from "../state.template";
import {SET_RESULT} from "../constant";

export default function (state = { ...contentState }, action) {
    const {type, payload} = action
    switch (type) {
        case SET_RESULT: {
            state = {tradeActions: payload}
            return state;
        }
        default: return state
    }
}