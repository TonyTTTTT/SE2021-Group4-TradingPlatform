import React ,{ useState, useEffect, useRef}from 'react';
import { AgGridColumn, AgGridReact} from 'ag-grid-react';
import { Row, Col, Nav, Tab } from 'react-bootstrap';
import { connect } from "react-redux";
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
        //console.log(selectedRow.AlgoID);
        // console.log(selectedRow);
        // if(countClick >= 1) {
        //     if( gridApi.getSelectedRows().id === selectedRow.id){
        //         console.log("doubleClick");
        //     }
        //         countClick = 0;
        // }else{
        //     countClick ++ ;
        //     console.log("1");
        //     setTimeout(()=>{},1000).then(function(){countClick--;console.log("2");})
            
        // }
    }

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);   
    };
   

    
    return (
        <Tab.Container  
            style={{height:"80%"}}
            id="controlled-tab-example"
            activeKey={tabKey}
            onSelect={(k) => setTabKey(k)}>
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
                                defaultColDef={{flex: 1,minWidth: 100,filter: true,resizable: true}}
                                rowSelection={'single'}
                                animateRows={true}
                                onGridReady={onGridReady}
                                autoGroupColumnDef={{ minWidth: 200, headerName:"Title"}}
                                enableRangeSelection={true}
                                //enableCellChangeFlash={true}
                                onRowSelected={onRowSelected}
                                rowData={props.menu.algoData}
                        
                                >
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
                                defaultColDef={{flex: 1,minWidth: 100,editable: true,filter: true,resizable: true}}
                                rowSelection={'single'}
                                animateRows={true}
                                autoGroupColumnDef={{ minWidth: 200 }}
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