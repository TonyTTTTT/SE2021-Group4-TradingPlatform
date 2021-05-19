import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import NavigationBar from "./Content/NavigationBar/navigationBar";
import Content from "./Content/content";
import SideArea from "./SideArea/sideArea"
import TagArea from "./TagArea/tagArea"
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
                        <SideArea/>
                        <TagArea/>
                    </Col>
                    
                    <Col xs={8}>
                        <Content/>
                        <div>Console</div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default MainPage;