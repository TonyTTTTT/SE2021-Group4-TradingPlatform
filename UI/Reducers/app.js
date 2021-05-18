import { appState } from "../state.template";

export default function (state = { ...appState }, action) {
    switch (action.type) {
        case "APP_TEST": {
            state = { ...state };
            return state;
        }
    }
}