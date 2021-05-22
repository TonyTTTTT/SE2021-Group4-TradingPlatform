import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import NavigationBar from "./Content/NavigationBar/navigationBar";
import Content from "./Content/content";
import SideArea from "./SideArea/sideArea"
import TagArea from "./TagArea/tagArea"
import Console from "./Console/console"
class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col xs={4}>
                        <SideArea/>
                        <TagArea/>
                    </Col>
                    <Col xs={8} style={{height: "100%"}}>
						<Content/>
						<Console/>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default MainPage;
