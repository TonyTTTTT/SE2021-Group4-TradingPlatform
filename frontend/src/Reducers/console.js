import { consoleState } from "../state.template";

export default function (state = { ...consoleState }, action) {
    let logLevel = {0: "ERROR", 1: "WARNING", 2: "INFO", 3: "DEBUG"};
    switch (action.type) {
        case "ADD_LOG": {
            state = { ...state };
            state.newlog = action.payload;// 設定 newlog, 此時 console component 會被 refresh
            state.newlog.level = logLevel[state.newlog.level];
            state.newlog.time = Date.now();
            return state;
        }
        default: return state
    }
}
