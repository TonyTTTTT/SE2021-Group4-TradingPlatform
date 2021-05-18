import { consoleState } from "../state.template";

export default function (state = { ...consoleState }, action) {
    switch (action.type) {
        case "CONSOLE_TEST": {
            state = { ...state };
            return state;
        }
    }
}