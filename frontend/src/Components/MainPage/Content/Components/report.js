import React, {Component} from 'react';
import Stackedit from "stackedit-js";

export default class Report extends Component {

    state = {content: ''}

    componentDidMount() {
        const {filename, text} = this.props
        const stackedit = new Stackedit();
        stackedit.openFile({
            name: filename,
            content: {
                text
            }
        })
        stackedit.on('fileChange', file => {
            this.md.value = file.content.text
        })
        stackedit.on('close', () => {
            this.props.close(this.md.value)
        })
    }

    render() {
        return (
            <div style={{width: '80%', height: '800px'}}>
                <textarea ref={c => this.md = c}/>
            </div>
        );
    }
}