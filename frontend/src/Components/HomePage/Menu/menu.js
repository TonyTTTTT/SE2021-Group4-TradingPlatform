import React ,{ useState, useEffect, useRef}from 'react';
import { AgGridColumn, AgGridReact} from 'ag-grid-react';
import { Row, Col, Nav, Tab } from 'react-bootstrap';
import { connect } from "react-redux";
import axios from "axios";
import Stackedit from "stackedit-js";
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const mapStateToProps = state =>{
    return { 
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
        setSelectedAlgoID :(id) =>{
            dispatch({
                type: "SET_SELECTED_ALGO_ID",
                payload:{
                    AlgoID :id
                }
            });
        },
        toggleUpdate : () => {
            dispatch({
                type: "SIGNAL_UPDATE"
            });
        },
        setHeaderButton:(value)=>{
            dispatch({
                type: "SET_HEADER_BUTTON",
                payload:{
                    value: value
                }
            });
        },
        setAlgoData:(algoData)=>{
            dispatch({
                type:"SET_ALGOS",
                payload:{
                    algoData:algoData
                }
            });
        },
        setReportData:(reportData)=>{
            dispatch({
                type:"SET_REPORTS",
                payload:{
                    reportData:reportData
                }
            });
        }
    };
};

const Menu = (props) => {
    // algoGrid
    const [algoGridApi, setAlgoGridApi] = useState(null);
    const [algoGridColumnApi, setAlgoGridColumnApi] = useState(null);
    const [selectedAlgoRow,setSelectedAlgoRow] = useState(null);
    // reportGrid
    const [reportGridApi, setReportGridApi] = useState(null);
    const [reportGridColumnApi, setReportGridColumnApi] = useState(null);
    const [selectedRow,setSelectedRow] = useState(null);
    const stackedit = new Stackedit();
    
    const [tabKey, setTabKey] = useState('Algo');
    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
          } else {

            if(props.menu.deleteSignal===true){
                algoGridApi.applyTransaction({ remove: algoGridApi.getSelectedRows() });
                props.signalDeleteAlgo();
            }
            
               
          }
    }, [algoGridApi,selectedRow,props.menu.deleteSignal])

    const onAlgoRowSelected = ()=>{
        if(algoGridApi.getSelectedRows()[0]!=undefined){
            setSelectedRow(algoGridApi.getSelectedRows());
            props.setSelectedAlgoID(algoGridApi.getSelectedRows()[0].AlgoID)
        }
    };

    const onAlgoDoubleClicked = ()=>{
       
        if(algoGridApi.getSelectedRows()[0]!=undefined){
            window.location.href = window.location.href+"main/"+props.menu.selectedAlgoID;
        }
    }

    const onReportDoubleClicked = ()=>{
        //console.log("test")
        if(reportGridApi.getSelectedRows()[0]!=undefined){
            //console.log("SelectedRow ID:");
            //console.log(reportGridApi.getSelectedRows()[0].ID)
            axios.get('/api2/get-report/' + reportGridApi.getSelectedRows()[0].ID).then(
                response => {
                    stackedit.openFile({
                        name: "report-name",
                        content: {
                            text:response.data.data
                        }
                    })
                },error => {console.log(error.message)}
            )
        }
    }

    const onAlgoGridReady = (params) => {
        axios.get('/api2/get-all-algo').then(
            response => {
                
                var data = response.data.data
                // algo data field remapping
                data.forEach(element => delete element.path);
                data.forEach(element => delete element.apply_product);
                data.forEach(element => delete element.parameter_set_id);
                data.forEach((element) => {element.AlgoID = element.id; delete element.id;});
                data.forEach((element) => {element.Title = element.title; delete element.title;});
                data.forEach((element) => {element.Version = element.version; delete element.version;});
                data.forEach((element) => {element.Description = element.description; delete element.description;});
                data.forEach((element) => {element.Last_Modified = element.lastModified; delete element.lastModified;});

                props.setAlgoData(data)
                setAlgoGridApi(params.api);
                setAlgoGridColumnApi(params.columnApi);  
            },error => {console.log(error.message)}
        )       
    };
    const onReportGridReady = (params) => {
        axios.get('/api2/get-all-report').then(
            response => {
                
                var data = response.data.data
                // report data field remapping
                data.forEach(element => delete element.path);
                
                data.forEach((element) => {element.AlgoID = element.algo_id; delete element.algo_id;});
                data.forEach((element) => {element.Algo = element.algo_title; delete element.algo_title;});
                data.forEach((element) => {element.ID = element.id; delete element.id;});
                data.forEach((element) => {element.Title = element.title; delete element.title;});
              
                props.setReportData(data)
                setReportGridApi(params.api);
                setReportGridColumnApi(params.columnApi);  
            },error => {console.log(error.message)}
        )
    }

    const onTabSelect = (tab) => {
        if(tab === "Algo"){
            props.setHeaderButton(false);
            setTabKey("Algo");
        }else{
            props.setHeaderButton(true);
            setTabKey("Report");
        }
    }

    return (
        <Tab.Container  
            style={{height:"80%"}}
            id="controlled-tab-example"
            activeKey={tabKey}
            onSelect={(k) => onTabSelect(k)}>
            <Row style={{height:"100%"}}>
               <Col style={{width:"100%"}}> 
                    <Nav variant="tabs" className="flex-row" style={{height:45}}>
                        <Nav.Item>
                        <Nav.Link eventKey="Algo">Algorithms</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="Report">Report</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content style={{height:"90%"}}>
                        <Tab.Pane eventKey="Algo" style={{height:"100%",width:"100%"}}>
                        <div className="ag-theme-alpine-dark" style={{height:"100%",width:"100%"}}>
                            <AgGridReact   
                                defaultColDef={{flex: 1,minWidth: 180,filter: true,resizable: true}}
                                rowSelection={'single'}
                                animateRows={true}
                                onGridReady={onAlgoGridReady}
                                autoGroupColumnDef={{ minWidth: 200, headerName:"Title"}}
                                enableRangeSelection={true}
                                onRowSelected={onAlgoRowSelected}
                                onRowDoubleClicked = {onAlgoDoubleClicked}
                                rowData={props.menu.algoData}
                        
                                >
                                <AgGridColumn field ="AlgoID" hide={true}></AgGridColumn>
                                <AgGridColumn field ="Title" hide={true} sortable={true} filter={true} rowGroup={true}></AgGridColumn>
                                <AgGridColumn field ="Version" filter={true}></AgGridColumn>
                                <AgGridColumn field ="Description" filter={true}></AgGridColumn>
                                <AgGridColumn field ="Last_Modified" filter={true}></AgGridColumn>
                            </AgGridReact>
                        </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Report" style={{height:"100%",width:"100%"}}>
                        <div className="ag-theme-alpine-dark" style={{height:"100%",width:"100%"}}>
                            <AgGridReact   
                                defaultColDef={{flex: 1,minWidth: 180,filter: true,resizable: true}}
                                rowSelection={'single'}
                                animateRows={true}
                                autoGroupColumnDef={{ minWidth: 200 , headerName:"Algorithm"}}
                                enableRangeSelection={true}
                                onGridReady={onReportGridReady}
                                rowData = {props.menu.reportData}
                                onRowDoubleClicked = {onReportDoubleClicked}
                                >
                                <AgGridColumn field ="Algo" hide={true} filter={true} sortable={true}  rowGroup={true}></AgGridColumn>
                                <AgGridColumn field ="Title" filter={true} sortable={true}  ></AgGridColumn>
                                <AgGridColumn field ="Last_Modified" filter={true}></AgGridColumn>
                            </AgGridReact>
                        </div>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);