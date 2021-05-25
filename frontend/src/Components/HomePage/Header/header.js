import React, {useState, useRef}from 'react';
import {Container, Row, Col, Modal , Button, InputGroup, FormControl} from 'react-bootstrap';
import { connect } from "react-redux";
import { consoleState } from '../../../state.template';

function mapStateToProps({header}) {
    return { header };
}

const mapDispatchToProps = dispatch => {
    return {
        signalDeleteAlgo : () => {
            dispatch({
                type: "DELETE_ALGO"
            });
        },
        addAlgo : (title,version,description,content,updateTime) => {
            dispatch({
                type: "ADD_ALGO",
                payload:{
                    Title: title,
                    Version: version,
                    Description : description,
                    Content: content,
                    LastUpdate: updateTime,
                }
            });
        },
        signalUpdateAlgo : () => {
            dispatch({
                type: "UPDATE_ALGO"
            });
        }
    };
};

const Header = (props) => {
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [show,setShow]= useState(false)
    
    var newInput;
    var updateInput;
    var promiseInfo = {};

    const onNewButtonClick = async() => {
        showModal();
    };

    const onUpdateButtonClick = () => {
        updateInput.click();
    };

    const onDeleteButtonClick = () => {
        props.signalDeleteAlgo();
    };

    const onNewInputChange = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

    const onUpdateInputChange = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
        console.log("selected file:");
        console.log(selectedFile);
	};
    
    
    const showModal = async () => {
        setShow(true);
    }

    return (
        <Container className="d-flex justify-content-between flex-column" style={{height:"100%",width:"100%"}}>
            <Row className="d-flex justify-content-left ">  
                <Button variant="outline-primary"  onClick={onNewButtonClick} style={{margin:"40% 0% 10% 0%",width:100 ,height:60}}> New <input hidden type="file" name="file" onChange={onNewInputChange} ref={(input) => newInput = input}/></Button> 

                <Button variant="outline-primary" onClick={onUpdateButtonClick} style={{margin:"10% 0% 10% 0%",width:100,height:60}}> Update <input hidden type="file" name="file" onChange={onUpdateInputChange} ref={(input)=> updateInput = input}/></Button>

                <Button variant="outline-primary" onClick={onDeleteButtonClick} style={{margin:"10% 0% 10% 0%",width:100 ,height:60}}> Delete </Button>    
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
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Description</InputGroup.Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(Header);
