import React, {Component} from 'react';
import Stackedit from "stackedit-js";

export default class App extends Component {

    state = {showMd: true, content: ''}

    componentDidMount() {
        const stackedit = new Stackedit();
        stackedit.openFile({
            name: 'Filename',
            content: {
                text: this.md.value
            }
        })
        stackedit.on('fileChange', file => {
            this.md.value = file.content.text
            console.log(this.md.value)
        })
        stackedit.on('close', () => {
            console.log('close')
            console.log(this.md.value)
            this.setState({showMd: false})
        })
    }

    render() {
        return (
            <div>
                {this.state.showMd ?
                    <textarea ref={c => this.md = c}/> :
                    ''
                }
            </div>
        );
    }
}