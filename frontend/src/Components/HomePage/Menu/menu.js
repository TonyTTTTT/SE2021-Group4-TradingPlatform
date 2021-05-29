import React ,{ useState, useEffect, useRef}from 'react';
import { AgGridColumn, AgGridReact} from 'ag-grid-react';
import { Row, Col, Nav, Tab } from 'react-bootstrap';
import { connect } from "react-redux";
import axios from "axios";
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
        }
    };
};

const Menu = (props) => { 

    const [gridApi, setGridApi] = useState(null);
    const [selectedRow,setSelectedRow] = useState(null)
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [tabKey, setTabKey] = useState('Algo');
    
    const mounted = useRef(false);
    var countClick = 0;

    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
          } else {
           
          }
        if(props.menu.deleteSignal===true){
            gridApi.applyTransaction({ remove: selectedRow });
            props.signalDeleteAlgo();
        }
    
    }, [gridApi,selectedRow,props.menu.deleteSignal])

    const onRowSelected = ()=>{
        if(gridApi.getSelectedRows()[0]!=undefined){
            setSelectedRow(gridApi.getSelectedRows());
            props.setSelectedAlgoID(gridApi.getSelectedRows()[0].AlgoID)
        }
    };

    const onGridReady = (params) => {
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

                console.log(data)
                props.setAlgoData(data)
                setGridApi(params.api);
                setGridColumnApi(params.columnApi);  
            },error => {console.log(error.message)}

        )
         
    };

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
                                onGridReady={onGridReady}
                                autoGroupColumnDef={{ minWidth: 200, headerName:"Title"}}
                                enableRangeSelection={true}
                                //enableCellChangeFlash={true}
                                onRowSelected={onRowSelected}
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
                                rowData={props.menu.reportData}
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