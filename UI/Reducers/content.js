import { contentState } from "../state.template";

export default function (state = { ...contentState }, action) {
    switch (action.type) {
        case "CONTENT_TEST": {
            state = { ...state };
            return state;
        }
    }
}