import React from 'react';
import { Container, Row,Col,Dropdown, Table, Button, Tab, Tabs, Nav, Form } from 'react-bootstrap';
import { Scrollbars } from "rc-scrollbars";
import { Link } from 'react-router-dom';
import HomePage from '../../HomePage';
import axios from "axios";

// This let is for testing
let algo_info = {
                    "name": "BH_algo",
                    "version": "0.1",
                    "algo_id": 0,
                    "parameter": [
                        {
                            "name": "product",
                            "type": "cat",
                            "value": ["TXF"],
                        },
                        {
                            "name": "color",
                            "type": "cat",
                            "value": ["red", "blue"]
                        },
                        {
                            "name": "height",
                            "type": "num",
                            "value": "float"
                        },
                        {
                            "name": "size",
                            "type": 'cat',
                            "value": ['big', 'small']
                        },
                        {
                            "name": "gender",
                            "type": 'cat',
                            "value": ['male', 'femlae']
                        },
                        {
                            "name": "weight",
                            "type": 'num',
                            "value": 'float'
                        },
                        {
                            "name": "age",
                            "type": 'num',
                            "value": 'int'
                        },
                        {
                            "name": "shoe_size",
                            "type": 'num',
                            "value": 'float'
                        },
                        {
                            "name": "head",
                            "type": 'cat',
                            "value": ['big','small', 'mid']
                        },
                    ]
                }; 


const mapStateToProps = state =>{
    return { 
        // sideArea : state.sideArea,
        menu : state.menu
    };
}


const mapDispatchToProps = dispatch => {
    return {
        runTest : (algo_id, product, parameter) => {
            dispatch({
                type: "CONTENT_TEST",
                payload:{
                    algo_id: algo_id,
                    product: product,
                    parameter: parameter,
                }
                
            });
        },
    };
};


class SideArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            param_format: {},
            product: {name: "", start_date: "", end_date: "", slip: ""},
            parameter: [],
        };
    }

    componentDidMount() {
        // console.log("selectedID: ", this.props.menu);
        axios.get('http://localhost:5000/get-algo-info/0').then(
        response => {
            // this.run(response.data)
            const res = response.data.data.parameter;
            this.setState({param_format: res})
            console.log(res);
            console.log(this.state.param_format);
        },
        error => console.log(error.message)
        )
    }


    runTest = (event) => {  
        const content = {"algo_id": 0, "product": this.state.product, "parameter": this.state.parameter}

        axios.post('http://localhost:5000/single-test', content).then(
        response => {
            // this.run(response.data)
            const res = response.data;
            console.log(res);
        },
        error => console.log(error.message)
        )
    }


    display_option(param_name, option, test_type) {
        let list = [];
        if(test_type == "single")
        {
            list.push(<option disabled selected value> -- select an option -- </option>);
            for(let i=0;i<option.length;i++) {
                list.push(<option value={option[i]}>{option[i]}</option>);
            }
        }
        else
        {
            for(let i=0;i<option.length;i++) {
                list.push(
                    <Form.Check 
                    type='checkbox'
                    id="batch-cat"
                    label={option[i]}
                    value={option[i]}
                    onChange={this.handleParamInput}
                    name={param_name}
                    />
                );
            }
        }
        return list;
    }

    display_param(param_set=algo_info, test_type) {
        let list = [];
        if(test_type == "single")
        {
            for(let i=0;i<param_set.length;i++) {
                if(param_set[i]['name']!='product') {
                    if(param_set[i]['type']=='cat') {
                        list.push(
                        <tr>
                            <td>{param_set[i]['name']}</td>
                            <td>
                                <select id="single-cat" name={param_set[i]['name']} onChange={this.handleParamInput}>
                                    {this.display_option(param_set[i]['name'], param_set[i]['value'],test_type)}
                                </select>
                            </td>
                        </tr>)
                    }
                    else {
                        list.push(
                        <tr>
                            <td>{param_set[i]['name']}({param_set[i]['value']})</td>
                            <td>
                                <input type="text" id="single-num" name={param_set[i]['name']} onChange={this.handleParamInput}/>
                            </td>
                        </tr>)
                    }
                }
            }
        }   
        else
        {
            for(let i=0;i<param_set.length;i++) {
                if(param_set[i]['name']!='product') {
                    if(param_set[i]['type']=='cat') {
                        list.push(
                        <tr>
                            <td>{param_set[i]['name']}</td>
                            <td>
                                <Form id="batch-cat" name={param_set[i]['name']}>
                                    {this.display_option(param_set[i]['name'], param_set[i]['value'],test_type)}
                                </Form>
                            </td>
                        </tr>)
                    }
                    else {
                        list.push(
                        <tr>
                            <td>{param_set[i]['name']}({param_set[i]['value']})</td>
                            <td>
                                <input type="text" id="batch-num-from" name={param_set[i]['name']} placeholder="from" onChange={this.handleParamInput}/>{' '}
                                <input type="text" id="batch-num-to" name={param_set[i]['name']} placeholder="to" onChange={this.handleParamInput}/>{' '}
                                <input type="text" id="batch-num-step" name={param_set[i]['name']} placeholder="step" onChange={this.handleParamInput}/>
                            </td>
                        </tr>)
                    }
                }
            }
        }
        return list;
    } 

    handleProductInput = (event) => {
        if(event.target.name == "product") {
            const copy_product = { ...this.state.product, 'name': event.target.value };
            this.setState({product: copy_product}, () => 
                {
                    console.log(this.state.product);
                    console.log(this.state);
                });
        }
        else if(event.target.name == "startDate") {
            const copy_product = { ...this.state.product, 'start_date': event.target.value };
            this.setState({product: copy_product}, () => 
                {
                    console.log(this.state.product);
                });
        }
        else if(event.target.name == "endDate") {
            const copy_product = { ...this.state.product, 'end_date': event.target.value };
            this.setState({product: copy_product}, () => 
                {
                    console.log(this.state.product);
                });
        }
        else if(event.target.name == "slip") {
            const copy_product = { ...this.state.product, 'slip': parseFloat(event.target.value) };
            this.setState({product: copy_product}, () => 
                {
                    console.log(this.state.product);
                });  
        }
    }

    handleParamInput = (event) => {
        if(event.target.id == "single-num") {
            const copy_parameter = this.state.parameter;
            for(let i =0; i<copy_parameter.length; i++) {
                if(copy_parameter[i].name == event.target.name) {
                    copy_parameter.splice(i,1);
                }
            }
            copy_parameter.push({"name": event.target.name, "type": "num", "value": parseFloat(event.target.value)});
            this.setState({parameter: copy_parameter}, () =>
            {
                console.log(this.state.parameter);
            });
        }
        else if(event.target.id == "single-cat") {
            const copy_parameter = this.state.parameter;
            for(let i =0; i<copy_parameter.length; i++) {
                if(copy_parameter[i].name == event.target.name) {
                    copy_parameter.splice(i,1);
                }
            }
            copy_parameter.push({"name": event.target.name, "type": "cat", "value": event.target.value});
            this.setState({parameter: copy_parameter}, () =>
            {
                console.log(this.state.parameter);
            }); 
        }
        else if(event.target.id == "batch-num-from") {
            const copy_parameter = this.state.parameter;
            var flag = 0;
            for(let i =0; i<copy_parameter.length; i++) {
                if(copy_parameter[i].name == event.target.name) {
                    flag = 1;
                    copy_parameter[i].from = parseFloat(event.target.value);
                }
            }
            if(flag == 0) {
                copy_parameter.push({"name": event.target.name, "type": "num", "from": parseFloat(event.target.value), "to": "", "step": ""});
            }
            this.setState({parameter: copy_parameter}, () =>
            {
                console.log(this.state.parameter);
            });
        }
        else if(event.target.id == "batch-num-to") {
            const copy_parameter = this.state.parameter;
            var flag = 0;
            for(let i =0; i<copy_parameter.length; i++) {
                if(copy_parameter[i].name == event.target.name) {
                    flag = 1;
                    copy_parameter[i].to = parseFloat(event.target.value);
                }
            }
            if(flag == 0) {
                copy_parameter.push({"name": event.target.name, "type": "num", "from": "" , "to": parseFloat(event.target.value), "step": ""});
            }
            this.setState({parameter: copy_parameter}, () =>
            {
                console.log(this.state.parameter);
            });
        }
        else if(event.target.id == "batch-num-step") {
            const copy_parameter = this.state.parameter;
            var flag = 0;
            for(let i =0; i<copy_parameter.length; i++) {
                if(copy_parameter[i].name == event.target.name) {
                    flag = 1;
                    copy_parameter[i].step = parseFloat(event.target.value);
                }
            }
            if(flag == 0) {
                copy_parameter.push({"name": event.target.name, "type": "num", "from": "" , "to": "", "step": parseFloat(event.target.value)});
            }
            this.setState({parameter: copy_parameter}, () =>
            {
                console.log(this.state.parameter);
            });
        }
        else if(event.target.id == "batch-cat") {
            const copy_parameter = this.state.parameter;
            var flag = 0;
            for(let i =0; i<copy_parameter.length; i++) {
                if(copy_parameter[i].name == event.target.name) {
                    flag = 1;
                    if(event.target.checked) {
                        copy_parameter[i].value.push(event.target.value);
                    }
                    else {
                        for(let j =0; j<copy_parameter[i].value.length; j++) {
                            if(copy_parameter[i].value[j] == event.target.value) {
                                copy_parameter[i].value.splice(j,1);
                            }
                        }
                    }
                }
            }
            if(flag == 0) {
                copy_parameter.push({"name": event.target.name, "type": "cat", "value": [event.target.value]});
            }
            this.setState({parameter: copy_parameter}, () =>
            {
                console.log(this.state.parameter);
                console.log(event.target.value, " checked: ", event.target.checked);
            });
        }
    }

    handleSwitchTab = (event) => {
        this.setState({parameter: []});
        this.setState({product: {name: "", start_date: "", end_date: "", slip: ""}}, () =>
        {
            console.log(this.state);
        }) 
    }

    render() {  

        return (
            <Col style={{height:"100%"}}>
                <Row>
                    <Button variant="outline-dark" href="/">Home</Button>
                </Row>
                <Row>
                    <h1>{algo_info['name']}</h1>
                </Row>
                <Tab.Container defaultActiveKey="switch test" id="switch test"
                style={{height: "100%"}} >
                    <Nav variant="tabs" className="flex-row">
                        <Nav.Item>
                        <Nav.Link eventKey="Single Test" onClick={this.handleSwitchTab}>Single Test</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="Batch Test" onClick={this.handleSwitchTab}>Batch Test</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content style={{height:"100%"}}>
                    <Tab.Pane eventKey="Single Test" style={{height:"100%"}}>
                        <Row style={{height:"75%"}}>
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
                                    <td>{algo_info['version']}</td>
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
                                        <select name="product" onClick={this.handleProductInput}>
                                            <option value="TXF">TXF</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Start Date</td>
                                    <td><input class="args-input" type="date" name="startDate" onChange={this.handleProductInput} /></td>
                                </tr>
                                <tr>
                                    <td>End Date</td>
                                    <td><input class="args-input" type="date" name="endDate" onChange={this.handleProductInput} /></td>
                                </tr>
                                <tr>
                                    <td>slip(float)</td>
                                    <td><input name="slip" onChange={this.handleProductInput} /></td>
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th colSpan="2">Algo Parameters</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.display_param(this.state.param_format, 'single')}
                            </tbody>
                        </Table>
                        </Scrollbars>
                        </Row>
                        <Row>
                            <Button variant="danger" onClick={this.runTest}>Run Test</Button>{' '}
                            <Button variant="success">Save Parameters</Button>
                        </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="Batch Test" style={{height:"100%"}}>
                        <Row style={{height:"75%"}}>
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
                                    <td>{algo_info['version']}</td>
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
                                        <select name="product" onClick={this.handleProductInput}>
                                            <option value="TXF">TXF</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Start Date</td>
                                    <td><input class="args-input" type="date" name="startDate" onChange={this.handleProductInput} /></td>
                                </tr>
                                <tr>
                                    <td>End Date</td>
                                    <td><input class="args-input" type="date" name="endDate" onChange={this.handleProductInput} /></td>
                                </tr>
                                <tr>
                                    <td>slip(float)</td>
                                    <td><input name="slip" onChange={this.handleProductInput} /></td>
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th colSpan="2">Algo Parameters</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.display_param(this.state.param_format,'batch')}
                            </tbody>
                        </Table>
                        </Scrollbars>
                        </Row>
                         <Row>
                            <Button variant="danger" onClick={this.runTest}>Run Test</Button>{' '}
                            <Button variant="success">Save Parameters</Button>
                        </Row>
                </Tab.Pane>
                </Tab.Content>
                </Tab.Container>
            </Col>
        );
    }
}
export default SideArea;