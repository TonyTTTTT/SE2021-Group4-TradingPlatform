import React from 'react';
import { Container, Row,Col,Dropdown, Table, Button } from 'react-bootstrap';
import { Scrollbars } from "rc-scrollbars";
import { Link } from 'react-router-dom';
import HomePage from '../../HomePage';
import axios from "axios";
// import Button from '@material-ui/core/Button'


class SideArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            param_set: []
        };
    }
    componentDidMount() {
        // const ROOT_PATH = '/api1';
        axios.get('http://localhost:5000/test').then(
            response => {
                // this.run(response.data)
                const param_set = response.data;
                this.setState({param_set});
                console.log(response.data);
            },
            error => console.log(error.message)
        )

    }
    render() {  
        let algo_name = "BH Algo"
        let param_set =  [ ['color','catogory', ['red','blue']] , ['size','catogory', ['big','small']] , 
        ['gender','catogory', ['male', 'femlae']], ['height', 'numeric', 'float'], ['weight', 'numeric', 'float'], 
        ['age', 'numeric', 'int'], ['shoe_size', 'numeric', 'float'], ['head','catogory', ['big','small']] ]
        const styleObj = {
            fontSize: 8,
        }
        const scrollBarStyle = { width: 300, height: 420 };
        return (
            <Col style={styleObj}>
                <Row>
                    <h1>{algo_name}</h1>
                </Row>
                <Row>
                    <Button variant="outline-primary" style={{fontSize: 12}}>Single Test</Button>{' '}
                    <Button variant="outline-primary" style={{fontSize: 12}}>Batch Test</Button>
                </Row>
                <Row>
                <Scrollbars style={scrollBarStyle}>
                <Table striped bordered size="sm">
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
                        {display_param(this.state.param_set)}
                    </tbody>
                </Table>
                </Scrollbars>
                </Row>
            </Col>
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