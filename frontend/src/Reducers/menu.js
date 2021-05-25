import { menuState } from "../state.template";

export default function (state = { ...menuState }, action) {

    switch (action.type) {
        
        case "DELETE_ALGO": {
            state = { ...state };
            state.deleteSignal = !state.deleteSignal;
            return state;
        }
        case "ADD_ALGO": {
            state = { ...state };
            state.algoData = state.algoData.concat(action.payload);
            return state;
        }
        case "UPDATE_ALGO": {
            state = { ...state };
            state.updateSignal = !state.updateSignal;
            return state;
        }
        default:
            return state
    }
}