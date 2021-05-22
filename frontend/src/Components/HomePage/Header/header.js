import React from 'react';
import { Row, Col, Button, Dropdown} from 'react-bootstrap';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <Row style={{margin:"10px"}}>
                <Col>
                    <Button variant="dark">Algorithms</Button>{' '}
                    <Button variant="dark" >Reports</Button>{' '}
                </Col>
                <Col>
                    
                </Col>
                <Col>
                    <Button>New</Button>{' '}
                    <Button onClick={()=>{this.props.setDeleteClick(true)}}>Delete</Button>{' '}
                </Col>
            </Row>

        );
    }
}
export default Header;