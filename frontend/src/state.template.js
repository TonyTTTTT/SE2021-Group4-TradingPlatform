export const appState={

}
export const consoleState={
    newlog: {time: Date.now(), level: "INFO", text: "first log"}
}
export const contentState={

}
export const headerState={
    selectedFile: null,
    isFileSelected: false,
    disableNew:false,
    disableUpdate:false
}
export const menuState={
    selectedAlgoID : null,
    deleteSignal: false,
    algoData:[  {AlgoID:1,Title:"Algo 1",Version:"1.01",Description:"None",Content:"",Last_Modified:"2020-9-10 23:12:30"},
                {AlgoID:2,Title:"Algo 2",Version:"0.01",Description:"None",Content:"",Last_Modified:"2020-9-20 23:12:50"},
                {AlgoID:3,Title:"Algo 2",Version:"1.02",Description:"None",Content:"",Last_Modified:"2020-9-25 10:12:50"},
                {AlgoID:4,Title:"Algo 3",Version:"1.01",Description:"None",Content:"",Last_Modified:"2020-9-20 23:10:30"},
                {AlgoID:5,Title:"Algo 3",Version:"1.02",Description:"None",Content:"",Last_Modified:"2020-9-20 23:10:30"},
                {AlgoID:6,Title:"Algo 4",Version:"2.01",Description:"None",Content:"",Last_Modified:"2020-9-20 23:12:50"},
                {AlgoID:7,Title:"Algo 4",Version:"3.00",Description:"None",Content:"",Last_Modified:"2020-9-21 23:12:50"},
                {AlgoID:8,Title:"Algo 4",Version:"4.00",Description:"None",Content:"",Last_Modified:"2020-9-21 23:14:50"},
                {AlgoID:9,Title:"Algo 4",Version:"5.00",Description:"Last Version",Content:"",Last_Modified:"2021-9-20 23:12:50"},
               
               
    ],
    reportData:[{Algo:"Algo1",AlgoID: 1,Title: "Report Test1",Content:  ".......",Last_Modified: "30 days"},
                {Algo:"Algo1",AlgoID: 2,Title: "Report Test2",Content: ".......",Last_Modified: "30 days"},
                {Algo:"Algo1",AlgoID: 3,Title: "Report Test3",Content: ".......",Last_Modified: "30 days"},
                {Algo:"Algo2",AlgoID: 4,Title: "Report Test4",Content: ".......",Last_Modified: "30 days"}
    ]
}
export const navigationBarState={
    tabNum: 0
}
export const sideAreaState={
    result: null,
    testType: null,
}
export const tagAreaState={

}
