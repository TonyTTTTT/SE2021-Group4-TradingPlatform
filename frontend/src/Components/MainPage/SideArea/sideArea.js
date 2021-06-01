import React from 'react';
import { Row,Col,Table, Button, Tab, Nav, Form } from 'react-bootstrap';
import { Scrollbars } from "rc-scrollbars";
import axios from "axios";
import { connect } from "react-redux";

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
        sideArea : state.sideArea,
        menu : state.menu,
        console: state.console,
    };
}


const mapDispatchToProps = dispatch => {
    return {
        runTest : (result, testType) => {
            dispatch({
                type: "RUN_TEST",
                payload:{
                    result: result,
                    testType: testType,
                }
                
            });
        },
        addLog : (data) => {
            dispatch({
                type: "ADD_LOG",
                payload:{
                    level: data.code,
                    text: data.msg,
                }
                
            });
        },
    };
};


class SideArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            algo_id: '',
            param_format: {},
            product: {name: "", start_date: "", end_date: "", slip: ""},
            parameter: [],
            algo_name: '',
            algo_version: '',
        };
    }

    componentDidMount() {
        console.log("selectedID: ", this.props.menu.selectedAlgoID);
        axios.get('/api2/get-algo-info/' + this.props.menu.selectedAlgoID).then(
        response => {
            // this.run(response.data)
            this.setState({algo_id: this.props.menu.selectedAlgoID});
            const res_param_format = response.data.data.parameter;
            this.setState({param_format: res_param_format});
            this.setState({algo_name: response.data.data.name});
            this.setState({algo_version: response.data.data.version});
            console.log(res_param_format);
            console.log(this.state.param_format);
        },
        error => console.log(error.message)
        )
    }
    componentDidUpdate() {

    }

    saveParam = (event) => {
        console.log('redux sidaArea result: ', this.props.sideArea.result);
        console.log('redux sideArea testType: ', this.props.sideArea.testType);
        console.log('redux console newlog: ', this.props.console.newlog);
    }

    runSingleTest = (event) => {  
        const content = {"algo_id": this.state.algo_id, "product": this.state.product, "parameter": this.state.parameter}

        axios.post('/api2/single-test', content).then(
        response => {
            // this.run(response.data)
            const res = response.data;
            console.log(res);
            this.props.addLog(res);
            console.log("addLog success");
            this.props.runTest(res.data, 'single');
            // console.log(res.code);
            // console.log(res.msg);

        },
        error => console.log(error.message)
        )
    }

    runBatchTest = (event) => {  
        const content = {"algo_id": this.state.algo_id, "product": this.state.product, "parameter": this.state.parameter}

        axios.post('/api2/batch-test', content).then(
        response => {
            // this.run(response.data)
            const res = response.data;
            console.log(res);
            this.props.addLog(res);
            console.log("addLog success");
            this.props.runTest(res.data, 'batch');
            // console.log(res.code);
            // console.log(res.msg);

        },
        error => console.log(error.message)
        )
    }


    display_option(param_name, option, test_type, param_id_pre) {
        let list = [];
        if(test_type === "single")
        {
            list.push(<option disabled selected value=""> -- select an option -- </option>);
            for(let i=0;i<option.length;i++) {
                list.push(<option value={option[i]}>{option[i]}</option>);
            }
        }
        else
        {
            for(let i=0;i<option.length;i++) {
                let param_id = param_id_pre+i;
                list.push(
                    <Form.Check 
                    type='checkbox'
                    id={param_id}
                    p_type='batch-cat'
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
        if(test_type === "single")
        {
            for(let i=0;i<param_set.length;i++) {
                if(param_set[i]['name']!=='product') {
                    let param_id = 'single_param'+i;
                    if(param_set[i]['type']==='cat') {
                        list.push(
                        <tr>
                            <td>{param_set[i]['name']}</td>
                            <td>
                                <select id={param_id} name={param_set[i]['name']} p_type="single-cat" onChange={this.handleParamInput}>
                                    {this.display_option(param_set[i]['name'], param_set[i]['value'],test_type, param_id)}
                                </select>
                            </td>
                        </tr>)
                    }
                    else {
                        list.push(
                        <tr>
                            <td>{param_set[i]['name']}({param_set[i]['value']})</td>
                            <td>
                                <input id={param_id} type="text" p_type="single-num" name={param_set[i]['name']} onChange={this.handleParamInput}/>
                            </td>
                        </tr>)
                    }
                }
            }
        }   
        else
        {
            for(let i=0;i<param_set.length;i++) {
                if(param_set[i]['name']!=='product') {
                    let param_id = 'batch_param'+i;
                    if(param_set[i]['type']==='cat') {
                        list.push(
                        <tr>
                            <td>{param_set[i]['name']}</td>
                            <td>
                                <Form id={param_id} name={param_set[i]['name']}>
                                    {this.display_option(param_set[i]['name'], param_set[i]['value'],test_type, param_id)}
                                </Form>
                            </td>
                        </tr>)
                    }
                    else {
                        list.push(
                        <tr>
                            <td>{param_set[i]['name']}({param_set[i]['value']})</td>
                            <td>
                                <Form id={param_id}>
                                    <input type="text" p_type="batch-num-from" name={param_set[i]['name']} placeholder="from" onChange={this.handleParamInput}/>{' '}
                                    <input type="text" p_type="batch-num-to" name={param_set[i]['name']} placeholder="to" onChange={this.handleParamInput}/>{' '}
                                    <input type="text" p_type="batch-num-step" name={param_set[i]['name']} placeholder="step" onChange={this.handleParamInput}/>
                                </Form>
                            </td>
                        </tr>)
                    }
                }
            }
        }
        return list;
    } 

    handleProductInput = (event) => {
        if(event.target.name === "product") {
            const copy_product = { ...this.state.product, 'name': event.target.value };
            this.setState({product: copy_product}, () => 
                {
                    console.log(this.state.product);
                    console.log(this.state);
                });
        }
        else if(event.target.name === "startDate") {
            const copy_product = { ...this.state.product, 'start_date': event.target.value };
            this.setState({product: copy_product}, () => 
                {
                    console.log(this.state.product);
                });
        }
        else if(event.target.name === "endDate") {
            const copy_product = { ...this.state.product, 'end_date': event.target.value };
            this.setState({product: copy_product}, () => 
                {
                    console.log(this.state.product);
                });
        }
        else if(event.target.name === "slip") {
            const copy_product = { ...this.state.product, 'slip': parseFloat(event.target.value) };
            this.setState({product: copy_product}, () => 
                {
                    console.log(this.state.product);
                });  
        }
    }

    handleParamInput = (event) => {
        let flag;
        if(event.target.getAttribute('p_type')=== "single-num") {
            const copy_parameter = this.state.parameter;
            for(let i =0; i<copy_parameter.length; i++) {
                if(copy_parameter[i].name === event.target.name) {
                    copy_parameter.splice(i,1);
                }
            }
            copy_parameter.push({"name": event.target.name, "type": "num", "value": parseFloat(event.target.value)});
            this.setState({parameter: copy_parameter}, () =>
            {
                console.log(this.state.parameter);
            });
        }
        else if(event.target.getAttribute('p_type')  === "single-cat") {
            const copy_parameter = this.state.parameter;
            for(let i =0; i<copy_parameter.length; i++) {
                if(copy_parameter[i].name === event.target.name) {
                    copy_parameter.splice(i,1);
                }
            }
            copy_parameter.push({"name": event.target.name, "type": "cat", "value": event.target.value});
            this.setState({parameter: copy_parameter}, () =>
            {
                console.log(this.state.parameter);
            }); 
        }
        else if(event.target.getAttribute('p_type') === "batch-num-from") {
            const copy_parameter = this.state.parameter;
            flag = 0;
            for(let i =0; i<copy_parameter.length; i++) {
                if(copy_parameter[i].name === event.target.name) {
                    flag = 1;
                    copy_parameter[i].from = parseFloat(event.target.value);
                }
            }
            if(flag === 0) {
                copy_parameter.push({"name": event.target.name, "type": "num", "from": parseFloat(event.target.value), "to": "", "step": ""});
            }
            this.setState({parameter: copy_parameter}, () =>
            {
                console.log(this.state.parameter);
            });
        }
        else if(event.target.getAttribute('p_type') === "batch-num-to") {
            const copy_parameter = this.state.parameter;
            flag = 0;
            for(let i =0; i<copy_parameter.length; i++) {
                if(copy_parameter[i].name === event.target.name) {
                    flag = 1;
                    copy_parameter[i].to = parseFloat(event.target.value);
                }
            }
            if(flag === 0) {
                copy_parameter.push({"name": event.target.name, "type": "num", "from": "" , "to": parseFloat(event.target.value), "step": ""});
            }
            this.setState({parameter: copy_parameter}, () =>
            {
                console.log(this.state.parameter);
            });
        }
        else if(event.target.getAttribute('p_type') === "batch-num-step") {
            const copy_parameter = this.state.parameter;
            flag = 0;
            for(let i =0; i<copy_parameter.length; i++) {
                if(copy_parameter[i].name === event.target.name) {
                    flag = 1;
                    copy_parameter[i].step = parseFloat(event.target.value);
                }
            }
            if(flag === 0) {
                copy_parameter.push({"name": event.target.name, "type": "num", "from": "" , "to": "", "step": parseFloat(event.target.value)});
            }
            this.setState({parameter: copy_parameter}, () =>
            {
                console.log(this.state.parameter);
            });
        }
        else if(event.target.getAttribute('p_type') === "batch-cat") {
            const copy_parameter = this.state.parameter;
            flag = 0;
            for(let i =0; i<copy_parameter.length; i++) {
                if(copy_parameter[i].name === event.target.name) {
                    flag = 1;
                    if(event.target.checked) {
                        copy_parameter[i].value.push(event.target.value);
                    }
                    else {
                        for(let j =0; j<copy_parameter[i].value.length; j++) {
                            if(copy_parameter[i].value[j] === event.target.value) {
                                copy_parameter[i].value.splice(j,1);
                            }
                        }
                    }
                }
            }
            if(flag === 0) {
                copy_parameter.push({"name": event.target.name, "type": "cat", "value": [event.target.value]});
            }
            this.setState({parameter: copy_parameter}, () =>
            {
                console.log(this.state.parameter);
                console.log(event.target.value, " checked: ", event.target.checked);
            });
        }
    }

    handleSwitchTab = (testType) => {
        this.setState({parameter: []});
        this.setState({product: {name: "", start_date: "", end_date: "", slip: ""}}, () =>
        {
            this.props.runTest(null, testType);
            console.log(this.state);
            this.myInput.focus();
            document.getElementById("startDate").value = "";
            document.getElementById("endDate").value = "";
            document.getElementById("slip").value = "";
            document.getElementById("startDate-batch").value = "";
            document.getElementById("endDate-batch").value = "";
            document.getElementById("slip-batch").value = "";
            // document.getElementById("single-cat").value = "";
            for(let i=1; i<this.state.param_format.length; i++) {
                // console.log("single_param"+i, ": ", document.getElementById("single_param"+i));
                document.getElementById("single_param"+i).value = "";
                if(this.state.param_format[i].type === 'cat') {
                    for(let j=0; j<this.state.param_format[i].value.length; j++)
                        document.getElementById("batch_param"+i+j).checked = false;
                }
                else {
                    document.getElementById("batch_param"+i).value = "";
                }
                
            }
        }) 
    }

    render() {  

        return (
            <Col style={{height:"100%"}}>
                <Row>
                    <Button variant="outline-dark" href="/">Home</Button>
                </Row>
                <Row>
                    <h1>{this.state.algo_name}</h1>
                </Row>
                <Tab.Container defaultActiveKey="switch test" id="switch test"
                style={{height: "100%"}} >
                    <Nav variant="tabs" className="flex-row">
                        <Nav.Item>
                        <Nav.Link eventKey="Single Test" onClick={() => this.handleSwitchTab("single")}>Single Test</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="Batch Test" onClick={() => this.handleSwitchTab("batch")}>Batch Test</Nav.Link>
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
                                    <td>{this.state.algo_version}</td>
                                </tr>
                                <tr>
                                    <td>ApplyProduct</td>
                                    <td/>
                                </tr>
                                <tr>
                                    <td>Parameter Set ID</td>
                                    <td/>
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
                                    <td><input className="args-input" type="date" name="startDate" id="startDate" onChange={this.handleProductInput} ref={myInput=>this.myInput=myInput} /></td>
                                </tr>
                                <tr>
                                    <td>End Date</td>
                                    <td><input className="args-input" type="date" name="endDate" id="endDate" onChange={this.handleProductInput} /></td>
                                </tr>
                                <tr>
                                    <td>slip(float)</td>
                                    <td><input name="slip" id="slip" onChange={this.handleProductInput} /></td>
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
                            <Button variant="danger" onClick={this.runSingleTest}>Run Test</Button>{' '}
                            <Button variant="success" onClick={this.saveParam}>Save Parameters</Button>
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
                                    <td>{this.state.algo_version}</td>
                                </tr>
                                <tr>
                                    <td>ApplyProduct</td>
                                    <td/>
                                </tr>
                                <tr>
                                    <td>Parameter Set ID</td>
                                    <td/>
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
                                    <td><input className="args-input" type="date" name="startDate" id="startDate-batch" onChange={this.handleProductInput} /></td>
                                </tr>
                                <tr>
                                    <td>End Date</td>
                                    <td><input className="args-input" type="date" name="endDate" id="endDate-batch" onChange={this.handleProductInput} /></td>
                                </tr>
                                <tr>
                                    <td>slip(float)</td>
                                    <td><input name="slip" id="slip-batch" onChange={this.handleProductInput} /></td>
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
                            <Button variant="danger" onClick={this.runBatchTest}>Run Test</Button>{' '}
                            <Button variant="success" onClick={this.saveParam}>Save Parameters</Button>
                        </Row>
                </Tab.Pane>
                </Tab.Content>
                </Tab.Container>
            </Col>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SideArea);