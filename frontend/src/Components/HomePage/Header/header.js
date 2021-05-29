import React, {useState, useRef, version}from 'react';
import {Container, Row, Col, Modal , Button, InputGroup, FormControl} from 'react-bootstrap';
import { connect } from "react-redux";
import { consoleState } from '../../../state.template';
import axios from "axios";

const mapStateToProps = state =>{
    return { 
        header : state.header,
        menu : state.menu
    };
}


const mapDispatchToProps = dispatch => {
    return {
        signalDeleteAlgo : () => {
            dispatch({
                type: "DELETE_ALGO"
            });
        },
        addAlgo : (id,title,version,description,content,lastModifiedTime) => {
            dispatch({
                type: "ADD_ALGO",
                payload:{
                    AlgoID : id,
                    Title: title,
                    Version: version,
                    Description : description,
                    Content: content,
                    Last_Modified: lastModifiedTime,
                }
            });
        },
        updateAlgo : (content,lastModifiedTime) => {
            dispatch({
                type: "UPDATE_ALGO",
                payload:{
                    Content:content,
                    Last_Modified:lastModifiedTime
                }
            });
        }
    };
};

const Header = (props) => {
    //const [selectedFile, setSelectedFile] = useState();
	//const [isFilePicked, setIsFilePicked] = useState(false);
    const [show,setShow] = useState(false);
    const [modalInput,setModalInput] = useState({title:null,version:null,description:null});
    
    var newInput;
    var updateInput;
    var promiseInfo = {};

    const readFile = (file)=> {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
      
          reader.onload = res => {
            resolve(res.target.result);
          };
          reader.onerror = err => reject(err);
      
          reader.readAsText(file);
        });
    }

    const onNewButtonClick = () => {
        setShow(true);
    };

    const onUpdateButtonClick = () => {
        updateInput.click();
    };

    const onDeleteButtonClick = () => {
        props.signalDeleteAlgo();
    };

    const onNewInputChange =  async (event) => {
		//setSelectedFile(event.target.files[0]);
		//setIsFilePicked(true);

        //read file 
        var UTCtime = event.target.files[0].lastModifiedDate;
        var dateTime = UTCtime.getFullYear()+'-'+(UTCtime.getMonth()+1)+'-'+UTCtime.getDate()+' '+UTCtime.getHours() + ":" +    UTCtime.getMinutes() + ":" + UTCtime.getSeconds();
        const content = await readFile(event.target.files[0]);
        

        // backend : create report , return algoID 
        let formData = new FormData();
        formData.append('title', modalInput.title);
        formData.append('version',modalInput.version);
        formData.append('description',modalInput.description);
        formData.append('lastModified',dateTime);
        formData.append('content',content);
       
        axios.post('/api2/create-algo', formData,
        {headers: {"Content-Type": "multipart/form-data"}},).then(
        response => {
            console.log(response)
            if (response.data.code === 2) {
                
                // action dispatch to menu component
                console.log("addAlgo  id:")
                console.log(response.data.data)
                props.addAlgo(response.data.data, modalInput.title, modalInput.version, modalInput.description,content,dateTime);
            } else {
                console.log(response.data.msg)
            }
        },
        error => {
            console.log(error.message)
        }
    )
       
    
	};

    const onUpdateInputChange = async (event) => {

        var UTCtime = event.target.files[0].lastModifiedDate;
        var dateTime = UTCtime.getFullYear()+'-'+(UTCtime.getMonth()+1)+'-'+UTCtime.getDate()+' '+UTCtime.getHours() + ":" +    UTCtime.getMinutes() + ":" + UTCtime.getSeconds();
        const content = await readFile(event.target.files[0]);
        

        // backend : update report 
        let formData = new FormData();
        console.log("header selected algoID")
        console.log(props.menu.selectedAlgoID)
        formData.append('algoID', props.menu.selectedAlgoID);
        formData.append('content',content);
       
        axios.post('/api2/update-algo', formData,
        {headers: {"Content-Type": "multipart/form-data"}},).then(
        response => {
            if (response.data.code === 2) {
                 // action dispatch to menu component
                 props.updateAlgo(content,dateTime);
            } else {
                console.log(response.data.msg)
            }
        },
        error => {
            console.log(error.message)
        })

	};
    
    const onConfirmButtonClick = () =>{
        newInput.click();
        setShow(false);
    }

    return (
        <Container className="d-flex justify-content-between flex-column" style={{height:"100%",width:"100%"}}>
            <Row className="d-flex justify-content-left ">  
                <Button variant="outline-primary"  disabled = {props.header.enableNew} onClick={onNewButtonClick} style={{margin:"40% 0% 10% 0%",width:100 ,height:60}}> New <input hidden type="file" name="file" onChange={onNewInputChange} ref={(input) => newInput = input}/></Button> 

                <Button variant="outline-primary" disabled ={props.header.enableUpdate} onClick={onUpdateButtonClick} style={{margin:"10% 0% 10% 0%",width:100,height:60}}> Update <input hidden type="file" name="file" onChange={onUpdateInputChange} ref={(input)=> updateInput = input}/></Button>

                <Button variant="outline-primary"   onClick={onDeleteButtonClick} style={{margin:"10% 0% 10% 0%",width:100 ,height:60}}> Delete </Button>    
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
                        <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" 
                        onChange={ e => setModalInput({...modalInput, title : e.target.value })} />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Version</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" 
                         onChange={ e => setModalInput({...modalInput, version : e.target.value })} />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Description</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" 
                         onChange={ e => setModalInput({...modalInput, description : e.target.value })} />
                    </InputGroup>
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick= {onConfirmButtonClick}>
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
