import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col xs={4}>
                        <div>SideArea</div>
                        <div>TagArea</div>
                    </Col>
                    
                    <Col xs={8}>
                        <div>Navigation Bar</div>
                        <div>Content</div>
                        <div>Console</div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default MainPage;