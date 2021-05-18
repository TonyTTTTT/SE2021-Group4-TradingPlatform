import { navigationBarState } from "../state.template";

export default function (state = { ...navigationBarState }, action) {
    switch (action.type) {
        case "NAVIGATIONBAR_TEST": {
            state = { ...state };
            return state;
        }
    }
}