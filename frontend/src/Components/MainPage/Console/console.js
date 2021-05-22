import React, { Component } from 'react'
import LogMessage from './logMessage'
import './logbox.css'

class Console extends Component {
    
    constructor () {
        super();
        this.state = {
            Logs : [
                {time: 1, level: "INFO", text: "Loaded parameter set 21451"},
                {time: 2, level: "DEBUG", text: "Start Single Test"},
                {time: 3, level: "INFO", text: "Finished Single Test. (Takes 1.2 sec)"},
                {time: 4, level: "ERROR", text: "local variable 'cat' reference before assignment"},
                {time: 5, level: "WARNING", text: "parameter 'ABC' is left blank"},
                {time: 6, level: "WARNING", text: "parameter 'ABC' is left blank"},
                {time: 7, level: "WARNING", text: "parameter 'ABC' is left blank"},
                {time: 8, level: "WARNING", text: "parameter 'ABC' is left blank"},
            ],
        }
    }

    render() {
        const {Logs} = this.state;
        let renderLog = Logs.map(log => <LogMessage key={log.time} log={log} />)
        return <div className="logbox"><ul>{renderLog}</ul></div>
    }
}


export default Console
