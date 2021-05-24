import React from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import Content from "./Content/content";
import SideArea from "./SideArea/sideArea"
import TagArea from "./TagArea/tagArea"
import Console from "./Console/console"

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container fluid style={{height:window.innerHeight,width:window.innerWidth}}>
                <Row>
                    <Col>
                        <Button variant="outline-dark" href="/" block>Home</Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4}>
                        <SideArea/>
                        <TagArea/>
                    </Col>
                    <Col xs={8} style={{height: "100%"}}>
                        <Container>
                            <Content/>
                            <Console/>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default MainPage;
