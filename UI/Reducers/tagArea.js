import { tagAreaState } from "../state.template";

export default function (state = { ...tagAreaState }, action) {
    switch (action.type) {
        case "TAGAREA_TEST": {
            state = { ...state };
            return state;
        }
    }
}