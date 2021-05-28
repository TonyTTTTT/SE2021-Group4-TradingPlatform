import React from 'react';
import { Container, Row,Col,Dropdown, Table, Button } from 'react-bootstrap';
import axios from "axios";

class TagArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}
    componentDidMount() {

    }

    runTest() {  
        const content = {"algo_id": 0, "product": {"name": "TXF","start_date": 20210501,"end_date":20210502, "slip": 1},"parameter": [{"name": "color","type": "cat","value": "red"},{"name": "height","type": "num","value": 178.5}]}

        axios.post('http://localhost:5000/single-test', content).then(
        response => {
            // this.run(response.data)
            const res = response.data;
            console.log(res);
        },
        error => console.log(error.message)
        )
	}	

	render() {
        const styleObj = {
            fontSize: 8,
            height: "0%",
        }
     //    const runTest = () => {  
	    //     const content = {"algo_id": 0, "product": {"name": "TXF","start_date": 20210501,"end_date":20210502, "slip": 1},"parameter": [{"name": "color","type": "cat","value": "red"},{"name": "height","type": "num","value": 178.5}]}

	    //     axios.post('http://localhost:5000/single-test', content).then(
	    //     response => {
	    //         // this.run(response.data)
	    //         const res = response.data;
	    //         console.log(res);
	    //     },
	    //     error => console.log(error.message)
	    //     )
    	// }	
		return(
			<Col style={{fontSize:8, height:"0%"}}>
           	 <Row>
                <Button variant="danger" onClick={this.runTest} style={styleObj}>Run Test</Button>{' '}
                <Button variant="success" style={styleObj}>Save Parameters</Button>
        	</Row>
            </Col>
		);
	}
}export default TagArea;