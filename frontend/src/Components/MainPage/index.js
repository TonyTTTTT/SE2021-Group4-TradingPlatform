import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import NavigationBar from "./NavigationBar/navigationBar";

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
                        <NavigationBar/>
                        <div>Content</div>
                        <div>Console</div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default MainPage;