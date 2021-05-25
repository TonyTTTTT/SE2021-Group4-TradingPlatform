import { headerState } from "../state.template";

export default function (state = { ...headerState }, action) {
    switch (action.type) {
        case "HEADER_TEST": {
            state = { ...state };
            return state;
        }
        default:
            return state
    }
}