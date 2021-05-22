import React,{ useState, useRef, useEffect} from 'react';
import { Container ,Row,Col} from 'react-bootstrap';
import Header from "./Header/header"
import Menu from "./Menu/menu"
const HomePage = () => {
    
    const [deleteClick,setDeleteClick] = useState(false);
    useEffect(() => {
       if(deleteClick==true){
            setDeleteClick(false);
       }
    }, [deleteClick])

    return (
            <Container style={{height:400,width:800}}>
                <Header setDeleteClick ={setDeleteClick}></Header>
                <Menu deleteClick ={deleteClick}></Menu>
            </Container>
    );
    
}
export default HomePage;