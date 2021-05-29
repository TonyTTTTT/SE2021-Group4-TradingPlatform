import { sideAreaState } from "../state.template";

export default function (state = { ...sideAreaState }, action) {
    switch (action.type) {
        case "GET_ALGO_INFO": {
            state = { ...state };
            return state;
        }
        default:
        	return state;
    }
}