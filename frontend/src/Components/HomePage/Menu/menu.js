import React ,{ useState, useEffect, useRef}from 'react';
import { AgGridColumn, AgGridReact} from 'ag-grid-react';
import { Row, Col, Nav, Tab } from 'react-bootstrap';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const Menu = (props) => { 

    const [gridApi, setGridApi] = useState(null);
    const [algoData, setAlgoData] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [tabKey, setTabKey] = useState('Algo');

    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
          } else {
            if(props.deleteClick===true){
                onRemoveSelected();
            }
          }
        
    }, [props.deleteClick,gridApi])

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
        setAlgoData([   {Title:"A",Version:"1.01",Description:"None",Last_Modified:"20 days ago"},
                        {Title:"B",Version:"0.01",Description:"None",Last_Modified:"30 days ago"},
                        {Title:"ABC",Version:"2.10",Description:"None",Last_Modified:"15 days ago"},
                        {Title:"A",Version:"1.01",Description:"None",Last_Modified:"20 days ago"},
                        {Title:"B",Version:"0.01",Description:"None",Last_Modified:"30 days ago"},
                        {Title:"ABC",Version:"2.10",Description:"None",Last_Modified:"15 days ago"},
                        {Title:"A",Version:"1.01",Description:"None",Last_Modified:"20 days ago"},
                        {Title:"B",Version:"0.01",Description:"None",Last_Modified:"30 days ago"},
                        {Title:"ABC",Version:"2.10",Description:"None",Last_Modified:"15 days ago"},
                        {Title:"A",Version:"1.01",Description:"None",Last_Modified:"20 days ago"},
                        {Title:"B",Version:"0.01",Description:"None",Last_Modified:"30 days ago"},
                        {Title:"ABC",Version:"2.10",Last_Modified:"15 days ago"},
                        {Title:"A",Version:"1.01",Last_Modified:"20 days ago"},
                        {Title:"B",Version:"0.01",Last_Modified:"30 days ago"},
                        {Title:"ABC",Version:"2.10",Last_Modified:"15 days ago"},
                    ])
        
    };
    const onRemoveSelected = () => {
        var selectedData = gridApi.getSelectedRows();
        var res = gridApi.applyTransaction({ remove: selectedData });
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
                                defaultColDef={{flex: 1,minWidth: 100,editable: true,filter: true,resizable: true}}
                                rowSelection={'multiple'}
                                animateRows={true}
                                onGridReady={onGridReady}
                                autoGroupColumnDef={{ minWidth: 200, headerName:"Title"}}
                                enableRangeSelection={true}
                                rowData={algoData} 
                                
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
                                rowSelection={'multiple'}
                                animateRows={true}
                                autoGroupColumnDef={{ minWidth: 200 }}
                                enableRangeSelection={true}
                                rowData={algoData}
                                >
                                <AgGridColumn field ="Title" filter={true} sortable={true}  rowGroup={true}></AgGridColumn>
                                <AgGridColumn field ="Version" filter={true}></AgGridColumn>
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
export default Menu;