import React from 'react';
import { Container, Row,Col,Dropdown, Table, Button, Tab, Tabs, Nav, Form } from 'react-bootstrap';
import { Scrollbars } from "rc-scrollbars";
import { Link } from 'react-router-dom';
import HomePage from '../../HomePage';
import axios from "axios";
import Example from './Components/datepicker'
// import { Example } from './Components/datepicker.js';
// import Button from '@material-ui/core/Button'


class SideArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paramset_format: {},
            paramset_single: {product: {name: "", start_date: "", end_date: "", slip: ""}},
            // paramset_single: '',
            paramset_batch: {}
        };
    
    }

    componentDidMount() {

    }

    handleSlipInput = (event) => {
        this.setState({paramset_single: {product: {slip: event.target.value}}}, () => 
            {
                console.log(this.state.paramset_single);
            })
    }

    handleStartDateInput = (event) => {
        this.setState({paramset_single: {product: {start_date: event.target.value}}}, () => 
            {
                console.log(this.state.paramset_single);
            })
    }

    handleEndDateInput = (event) => {
        this.setState({paramset_single: {product: {end_date: event.target.value}}}, () => 
            {
                console.log(this.state.paramset_single);
            })
    }

    render() {  
        let algo_name = "BH Algo"
        let param_set =  [ ['color','catogory', ['red','blue']] , ['size','catogory', ['big','small']] , 
        ['gender','catogory', ['male', 'femlae']], ['height', 'numeric', 'float'], ['weight', 'numeric', 'float'], 
        ['age', 'numeric', 'int'], ['shoe_size', 'numeric', 'float'], ['head','catogory', ['big','small', 'mid']] ]
        const input_slip = (value) => {
            console.log("entering slip. ",value);
        }
        return (
            <Col style={{fontSize:8, height:"90%"}}>
                <Row>
                    <Button variant="outline-dark" href="/">Home</Button>
                </Row>
                <Row>
                    <h1>{algo_name}</h1>
                </Row>
                <Tab.Container defaultActiveKey="switch test" id="switch test"
                style={{height: "100%"}}>
                    <Nav variant="tabs" className="flex-row">
                        <Nav.Item>
                        <Nav.Link eventKey="Single Test">Single Test</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="Batch Test">Batch Test</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content style={{height:"100%"}}>
                    <Tab.Pane eventKey="Single Test" style={{height:"100%"}}>
                        <Row style={{height:"70%"}}>
                        <Scrollbars>
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
                                    <td>
                                        <select>
                                            <option value="product">TXF</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Start Date</td>
                                    <td><input class="args-input" type="date" name="startDate" onChange={this.handleStartDateInput} /></td>
                                </tr>
                                <tr>
                                    <td>End Date</td>
                                    <td><input class="args-input" type="date" name="startDate" onChange={this.handleEndDateInput} /></td>
                                </tr>
                                <tr>
                                    <td>slip(float)</td>
                                    <td><input onChange={this.handleSlipInput} /></td>
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th colSpan="2">Algo Parameters</th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_param(param_set, 'single')}
                            </tbody>
                        </Table>
                        </Scrollbars>
                        </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="Batch Test" style={{height:"100%"}}>
                        <Row style={{height:"70%"}}>
                        <Scrollbars>
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
                                    <td>
                                        <select>
                                            <option value="product">TXF</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Start Date</td>
                                    <td><Example/></td>
                                </tr>
                                <tr>
                                    <td>End Date</td>
                                    <td><Example/></td>
                                </tr>
                                <tr>
                                    <td>slip(float)</td>
                                    <td><input type="slip"/></td>
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th colSpan="2">Algo Parameters</th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_param(param_set,'batch')}
                            </tbody>
                        </Table>
                        </Scrollbars>
                        </Row>
                </Tab.Pane>
                </Tab.Content>
                </Tab.Container>
            </Col>
        );
    }
}
export default SideArea;

function display_option(option, test_type) {
    let list = [];
    if(test_type == "single")
    {
        for(let i=0;i<option.length;i++) {
            list.push(<option value="param">{option[i]}</option>)
        }
    }
    else
    {
        for(let i=0;i<option.length;i++) {
            list.push(
                <Form.Check 
                type='checkbox'
                id={option[i]} 
                label={option[i]}
                />
            )
        }
    }
    return list;
}
function display_param(param_set = [ ['color','catogory', ['red','blue']] , ['size','catogory', ['big','small']] , 
['gender','catogory', ['male', 'femlae']], ['height', 'numeric', 'float'] ], test_type) {
    let list = [];
    if(test_type == "single")
    {
        for(let i=0;i<param_set.length;i++) {

            if(param_set[i][1]=='catogory') {
                list.push(
                <tr>
                    <td>{param_set[i][0]}</td>
                    <td>
                        <select>
                            {display_option(param_set[i][2],test_type)}
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
    }   
    else
    {
        for(let i=0;i<param_set.length;i++) {

            if(param_set[i][1]=='catogory') {
                list.push(
                <tr>
                    <td>{param_set[i][0]}</td>
                    <td>
                        <Form>
                            {display_option(param_set[i][2],test_type)}
                        </Form>
                    </td>
                </tr>)
            }
            else {
                list.push(
                <tr>
                    <td>{param_set[i][0]}({param_set[i][2]})</td>
                    <td>
                        <input type="text" placeholder="from"/>{' '}<input type="text" placeholder="to"/>
                    </td>
                </tr>)
            }
        }
    }
    return list;
} 