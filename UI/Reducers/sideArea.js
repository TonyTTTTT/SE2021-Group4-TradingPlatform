import { sideAreaState } from "../state.template";

export default function (state = { ...sideAreaState }, action) {
    switch (action.type) {
        case "SIDEAREA_TEST": {
            state = { ...state };
            return state;
        }
    }
}