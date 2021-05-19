import { navigationBarState } from "../state.template";

export default function navigationBarReducer(state = { ...navigationBarState }, action) {
    const {type, data} = action
    switch (type) {
        default:
            return state
    }
}