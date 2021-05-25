import React, {useState, useRef}from 'react';
import {Container, Row, Col, Modal , Button, InputGroup, FormControl} from 'react-bootstrap';
import { consoleState } from '../../../state.template';
const Header = (props) => {
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [show,setShow]= useState(false)
    
    var newInput;
    var updateInput;
    var promiseInfo = {};

    const onNewButtonClick = async() => {
        showModal();
    }
    const onUpdateButtonClick = () => {
        updateInput.click();
    }
    const onUpdateChange = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
        console.log("selected file:");
        console.log(selectedFile);
	};
    const onNewChange = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};
    
    const showModal = async () => {
       setShow(true); 
    }

    return (
        <Container className="d-flex justify-content-between flex-column" style={{height:"100%",width:"100%"}}>
            <Row className="d-flex justify-content-left ">
                
                <Button variant="outline-primary"  onClick={onNewButtonClick} style={{margin:"40% 0% 10% 0%",width:100 ,height:60}}> New <input hidden type="file" name="file" onChange={onNewChange} ref={(input)=> newInput = input}/></Button> 
                  
                <Button variant="outline-primary" onClick={onUpdateButtonClick} style={{margin:"10% 0% 10% 0%",width:100,height:60}}> Update <input hidden type="file" name="file" onChange={onUpdateChange} ref={(input)=> updateInput = input}/></Button>

                <Button variant="outline-primary" style={{margin:"10% 0% 10% 0%",width:100 ,height:60}} onClick={()=>{props.setDeleteClick(true)}}> Delete </Button>    
            </Row>

            <Row className="d-flex justify-content-right ">
                <Button href="/main" style={{lineHeight:"5",padding:"auto",margin:"0% 0% 40% 0%",width:100 ,height:100}} variant="success" >Select !</Button>    
            </Row>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                enforceFocus ={true}
                >
                <Modal.Header closeButton>
                    <Modal.Title>New Algorithm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Title</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Version</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick= {()=>{newInput.click();setShow(false);}}>
                        Confirm
                    </Button>
                    <Button variant="secondary" onClick={()=>{setShow(false);}}>
                        Exit
                    </Button>  
                </Modal.Footer>
            </Modal>
        </Container>



    );
    
}
export default Header;