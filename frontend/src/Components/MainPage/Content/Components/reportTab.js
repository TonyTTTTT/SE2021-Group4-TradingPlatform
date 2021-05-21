import React, {Component} from 'react';
import Stackedit from "stackedit-js";

export default class ReportTab extends Component {

    state = {showMd: true, content: ''}

    componentDidMount() {
        const stackedit = new Stackedit();
        stackedit.openFile({
            name: 'filename',
            content: {
                text: this.md.value
            }
        })
        stackedit.on('fileChange', file => {
            this.md.value = file.content.text
        })
        stackedit.on('close', () => {
            console.log(this.md.value)
            this.setState({showMd: false})
        })
    }

    render() {
        const {showMd} = this.state
        return (
            <div style={{width: '600px', height: '800px'}}>
                {
                    showMd ? <textarea ref={c => this.md = c} /> : ''
                }
            </div>
        );
    }
}