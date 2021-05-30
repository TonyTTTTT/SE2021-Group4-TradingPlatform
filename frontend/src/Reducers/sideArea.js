import { sideAreaState } from "../state.template";

export default function (state = { ...sideAreaState }, action) {
    switch (action.type) {
        case "SINGLE_TEST": {
            state = { ...state };
            state.result = action.payload.result;
            return state;
        }
        default:
        	return state;
    }
}