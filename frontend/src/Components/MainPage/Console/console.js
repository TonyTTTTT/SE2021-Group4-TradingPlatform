import React, { Component } from 'react'
import { connect } from "react-redux";
import LogMessage from './logMessage'
import './logbox.css'

const mapStateToProps = state =>{
    return { 
        console : state.console // map props.console of this component to Redux's state.console, that is, consoleState
    };
}

const mapDispatchToProps = dispatch => {
    return {
        log: (data) => {
            dispatch({
                type: "ADD_LOG",
                payload: {
                    level: data.level,
                    text: data.text
                }
            });
        }
    };
};

class Console extends Component {
    
    constructor () {
        super();
        this.state = {
            logs : [],
        }
    }

    // will be called when Reducer update consoleState, bcz we bind props.console to consoleState
    componentDidUpdate( prevProps ) {
        // add consoleState.newlog via inner function `addLog`
        if (prevProps.console.newlog.time !== this.props.console.newlog.time)
            this.addLog(this.props.console.newlog);
    }

    clearConsole = () => {
        this.setState({
            logs: []
        })
    }

    addLog = (data) => {
        this.setState({
            logs: [{
                time: data.time,
                level: data.level,
                text: data.text,
            }].concat(this.state.logs)
        })
    }

    render() {
        const {logs} = this.state;
        let renderLog = logs.map(log => <LogMessage key={log.time} log={log} />)
        return (
            <div>
                <div className="logbox"><ul>{renderLog}</ul></div>
                <button onClick={this.clearConsole}>Clear</button>
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Console);
