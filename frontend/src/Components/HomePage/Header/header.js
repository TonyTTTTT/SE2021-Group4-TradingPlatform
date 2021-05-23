import React from 'react';
import {Container, Row, Col, Button } from 'react-bootstrap';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <Container className="d-flex justify-content-between flex-column" style={{height:"100%",width:"100%"}}>
                <Row className="d-flex justify-content-left ">
                
                    <Button variant="outline-primary" style={{margin:"40% 0% 10% 0%",width:100 ,height:60}}>New</Button>
                    
                    <Button variant="outline-primary" style={{margin:"10% 0% 10% 0%",width:100 ,height:60}}>Update</Button>
                    <Button variant="outline-primary" style={{margin:"10% 0% 10% 0%",width:100 ,height:60}} onClick={()=>{this.props.setDeleteClick(true)}}>Delete</Button>
                        
                </Row>

                <Row className="d-flex justify-content-right ">
                
                    <Button style={{margin:"0% 0% 40% 0%",width:100 ,height:100}} variant="success" >Select !</Button>
                    
                </Row>
            </Container>

        );
    }
}
export default Header;