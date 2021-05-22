import React from 'react'

function LogMessage({log}) {

    if (log.level === "ERROR") {
        return <li><span style={{color: "red"}}>{log.level}</span> {log.text}</li>
    } else if (log.level === "WARNING") {
        return <li><span style={{color: "orange"}}>{log.level}</span> {log.text}</li>
    } else if (log.level === "INFO") {
        return <li><span style={{color: "blue"}}>{log.level}</span> {log.text}</li>
    } else if (log.level === "DEBUG") {
        return <li><span style={{color: "grey"}}>{log.level}</span> {log.text}</li>
    }
}


export default LogMessage
