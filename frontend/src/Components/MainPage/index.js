import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import SideArea from "./SideArea/sideArea"
import TagArea from "./TagArea/tagArea"
import Console from "./Console/console"
import NavigationBar from "./Content/NavigationBar/navigationBar";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container fluid style={{height: window.innerHeight, width: window.innerWidth}}>
                <Row style={{height: "100%"}}>
                    <Col sm={4} style={{height: "100%", width: "100%"}}>
                        <SideArea/>
                        <TagArea/>
                    </Col>
                    <Col sm={8} style={{height: "100%", width: "100%"}}>
                        <NavigationBar/>
                        <Console/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default MainPage;