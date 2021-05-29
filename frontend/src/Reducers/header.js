import { headerState } from "../state.template";

export default function (state = { ...headerState }, action) {
    switch (action.type) {
        case "SET_HEADER_BUTTON": {
            state = { ...state };
            state.enableNew = action.payload.value;
            state.enableUpdate = action.payload.value;
            return state;
        }
        default:
            return state
    }
}