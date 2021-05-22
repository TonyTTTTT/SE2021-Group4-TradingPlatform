import React from 'react';
import { Container,Row,Col,Button } from 'react-bootstrap';
import NavigationBar from "./Content/NavigationBar/navigationBar";
import Content from "./Content/content";
import SideArea from "./SideArea/sideArea"

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
                    <Col><Button variant="outline-dark" size="lg" block href="/">Home</Button></Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <SideArea/>
                    </Col>
                    
                    <Col xs={9}>
                        <Content/>
                        <div>Console</div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default MainPage;