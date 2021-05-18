import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <Row>
                <Col></Col>
                <Col>Header</Col>
                <Col></Col>
            </Row>
        );
    }
}
export default Header;