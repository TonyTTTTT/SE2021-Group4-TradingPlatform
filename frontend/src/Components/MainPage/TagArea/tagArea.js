import React from 'react';
import { Row,Col,Button } from 'react-bootstrap';
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
		return(
			<Col style={{height:"0%"}}>
           	 <Row>
                <Button variant="danger" onClick={this.runTest}>Run Test</Button>{' '}
                <Button variant="success">Save Parameters</Button>
        	</Row>
            </Col>
		);
	}
}export default TagArea;