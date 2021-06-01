import React,{ useState, useEffect} from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import Header from "./Header/header"
import Menu from "./Menu/menu"
const HomePage = () => {
    
    const [deleteClick,setDeleteClick] = useState(false);
    useEffect(() => {
       if(deleteClick===true){
            setDeleteClick(false);
       }
    }, [deleteClick])

    return (
            <Container style={{height:window.innerHeight,width:window.innerWidth}}>
                <Row style={{height:"5%"}}>
                </Row>
                <Row style={{height:"95%"}}>
                    <Col sm={10}style={{height:"100%"}}>
                        <Menu deleteClick ={deleteClick}></Menu>
                    </Col>
                    <Col sm={2}style={{height:"100%"}}>
                    <Header setDeleteClick ={setDeleteClick}></Header>
                    </Col>
                </Row>
            </Container>
    );
    
}
export default HomePage;