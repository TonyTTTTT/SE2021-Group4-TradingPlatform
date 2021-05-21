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
                    <Button variant="secondary">Reports</Button>{' '}
                </Col>
                <Col>
                    <Button style={{textAlign: "center"}}>New</Button>{' '}
                </Col>
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

        );
    }
}
export default Header;