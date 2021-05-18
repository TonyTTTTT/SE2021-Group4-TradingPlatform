import { menuState } from "../state.template";

export default function (state = { ...menuState }, action) {
    switch (action.type) {
        case "MENU_TEST": {
            state = { ...state };
            return state;
        }
    }
}