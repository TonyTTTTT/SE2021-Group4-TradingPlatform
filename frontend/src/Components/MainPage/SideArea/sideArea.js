import React from 'react';
import { Container, Row,Col,Table } from 'react-bootstrap';


class SideArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {  
        let pram_set = [ ['color','catogory', ['red','blue']] , ['size','catogory', ['big','small']]]
        return (
            <Container>
            <Row><input type="submit" value="Single Test"/><input type="submit" value="Batch Test"/></Row>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th colSpan="2">Algo Info</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>version</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>ApplyProduct</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Parameter Set ID</td>
                        <td></td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th colSpan="2">Product Setting</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Product</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Start Date</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>End Date</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>slip</td>
                        <td></td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th colSpan="2">Algo Parameters</th>
                    </tr>
                </thead>
                <tbody>
                    {display_param()}
                </tbody>
            </Table>
            </Container>
        );
    }
}
export default SideArea;

function display_option(option) {
    let list = [];
    for(let i=0;i<option.length;i++) {
        list.push(<option value="grapefruit">{option[i]}</option>)
    }
    return list;
}
function display_param(param_set = [ ['color','catogory', ['red','blue']] , ['size','catogory', ['big','small']] , ['gender','catogory', ['male', 'femlae']], ['height', 'numeric', 'float'] ]) {
    let list = [];
    for(let i=0;i<param_set.length;i++) {
        if(param_set[i][1]=='catogory') {
        list.push(
        <tr>
            <td>{param_set[i][0]}</td>
            <td>
                <select>
                    {display_option(param_set[i][2])}
                </select>
            </td>
        </tr>)
        }
        else {
            list.push(
            <tr>
                <td>{param_set[i][0]}({param_set[i][2]})</td>
                <td>
                    <input type="text"/>
                </td>
            </tr>)
        }
    }
    return list;
} 