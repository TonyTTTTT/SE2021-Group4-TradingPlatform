import React ,{ useState, useEffect, useRef}from 'react';
import { AgGridColumn, AgGridReact} from 'ag-grid-react';
import { Row, Col, Nav, Tab, Spinner} from 'react-bootstrap';
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
    const [selectedRow,setSelectedRow] = useState(null);
    const [algoSpinnerClass,setAlgoSpinnerClass] =useState("visible")
    // reportGrid
    const [reportGridApi, setReportGridApi] = useState(null);
    const [reportSpinnerClass,setReportSpinnerClass] =useState("visible")
    const stackedit = new Stackedit();
    
    const [tabKey, setTabKey] = useState('Algo');
    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
          } else {
            // do componentDidUpdate logic
            if(props.menu.deleteSignal===true){
                if(tabKey==="Algo"){
                    axios.delete('/api2/delete-algo/' + props.menu.selectedAlgoID).then(
                        response => {
                            //action dispatch to menu
                            algoGridApi.applyTransaction({ remove: algoGridApi.getSelectedRows() });
                            props.signalDeleteAlgo();
                        },error =>{
                            console.log(error.message)
                        } 
                    )
                }else{
                    axios.delete('/api2/delete-report/' + reportGridApi.getSelectedRows()[0].ID).then(
                        response => {
                            //action dispatch to menu
                            reportGridApi.applyTransaction({ remove: reportGridApi.getSelectedRows() });
                            props.signalDeleteAlgo();
                        },error =>{
                            console.log(error.message)
                        } 
                    ) 
                }
            }
          }
    }, [algoGridApi,selectedRow,props.menu.deleteSignal])

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
                setAlgoSpinnerClass("invisible")
            },error => {console.log(error.message)}
        )       
    };
    const onAlgoRowSelected = ()=>{
        if(algoGridApi.getSelectedRows()[0]!==undefined){
            setSelectedRow(algoGridApi.getSelectedRows());
            props.setSelectedAlgoID(algoGridApi.getSelectedRows()[0].AlgoID)
        }
    };
    const onAlgoDoubleClicked = ()=>{
        if(algoGridApi.getSelectedRows()[0]!==undefined){
            window.location.href = window.location.href+"main/"+props.menu.selectedAlgoID;
        }
    }
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
                data.forEach((element) => {element.Last_Modified = element.lastModified; delete element.lastModified;});
              
                props.setReportData(data)
                setReportGridApi(params.api);
                setReportSpinnerClass("invisible")
            },error => {console.log(error.message)}
        )
    }
    const onReportDoubleClicked = ()=>{
        if(reportGridApi.getSelectedRows()[0]!==undefined){
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
                    <Nav  variant="tabs" className="flex-row" style={{height:45}}>
                        <Nav.Item >
                        <Nav.Link  eventKey="Algo">Algorithm{" "}<Spinner className= {algoSpinnerClass} display size='sm' animation="border" role="status"/></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link  eventKey="Report">Report{" "}<Spinner className={reportSpinnerClass} size='sm' animation="border" role="status"/></Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Tab.Content style={{height:"90%"}}>
                        <Tab.Pane eventKey="Algo" style={{height:"100%",width:"100%"}}>
                        <div className="ag-theme-alpine-dark" style={{height:"100%",width:"100%"}}>
                            <AgGridReact   
                                defaultColDef={{flex: 1,minWidth: 180,filter: true,resizable: true,sortable: true}}
                                rowSelection={'single'}
                                animateRows={true}
                                onGridReady={onAlgoGridReady}
                                autoGroupColumnDef={{ minWidth: 200, headerName:"Title", field:"Title"}}
                                enableRangeSelection={true}
                                onRowSelected={onAlgoRowSelected}
                                onRowDoubleClicked = {onAlgoDoubleClicked}
                                rowData={props.menu.algoData}
                                >
                                <AgGridColumn field ="AlgoID" hide={true}/>
                                <AgGridColumn field ="Title" hide={true} sortable={true} filter={true} rowGroup={true}/>
                                <AgGridColumn field ="Version" filter={true} sortable={false}/>
                                <AgGridColumn field ="Description" filter={true} sortable={false}/>
                                <AgGridColumn field ="Last_Modified" filter={true} sortable={false}/>
                            </AgGridReact>
                        </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Report" style={{height:"100%",width:"100%"}}>
                        <div className="ag-theme-alpine-dark" style={{height:"100%",width:"100%"}}>
                            <AgGridReact   
                                defaultColDef={{flex: 1,minWidth: 180,filter: true,resizable: true,sortable: true}}
                                rowSelection={'single'}
                                animateRows={true}
                                autoGroupColumnDef={{ minWidth: 200 , headerName:"Algorithm",field:"Algo"}}
                                enableRangeSelection={true}
                                onGridReady={onReportGridReady}
                                rowData = {props.menu.reportData}
                                onRowDoubleClicked = {onReportDoubleClicked}
                                >
                                <AgGridColumn field ="Algo" hide={true} filter={true} sortable={true}  rowGroup={true}/>
                                <AgGridColumn field ="Title" filter={true} sortable={true}  />
                                <AgGridColumn field ="Last_Modified" filter={true} sortable={false}/>
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