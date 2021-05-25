import React from 'react';
import { Container, Row,Col,Dropdown, Table, Button } from 'react-bootstrap';

class TagArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}
	render() {
        const styleObj = {
            fontSize: 8,
            height: "0%",
        }
		return(
			<Col style={{fontSize:8, height:"0%"}}>
           	 <Row>
                <Button variant="danger" style={styleObj}>Run Test</Button>{' '}
                <Button variant="success" style={styleObj}>Save Parameters</Button>
        	</Row>
            </Col>
		);
	}
}export default TagArea;