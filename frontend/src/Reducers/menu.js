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
            
            //find selected Row by Selected AlgoID
            //state.updateSignal = !state.updateSignal;
             for (var i in state.algoData) {
               
                if (state.algoData[i].AlgoID === state.selectedAlgoID) {
                    state = { ...state };
                    var newData = {
                        AlgoID: state.algoData[i].AlgoID,
                        Title: state.algoData[i].Title,
                        Version: state.algoData[i].Version,
                        Description: state.algoData[i].Description,
                        Content: action.payload.Content,
                        Last_Modified: action.payload.Last_Modified
                    }
                    //state.deleteSignal = !state.deleteSignal;
                    //console.log(i);
                    state.algoData.splice(i, 1);
                    state.algoData = state.algoData.concat(newData)
                    
                    return state;
                }
            }
            return state;
        }
       
        case "SET_SELECTED_ALGO_ID": {
            state = { ...state };
            state.selectedAlgoID = action.payload.AlgoID;
            return state;
        }
        case "SET_ALGOS": {
            state = { ...state };
            state.algoData = action.payload.algoData;
            return state;
        }
        case "SET_REPORTS": {
            state = { ...state };
            state.reportData = action.payload.reportData;
            return state;
        }
        default:
            return state
    }
}