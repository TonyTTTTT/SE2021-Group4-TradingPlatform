import React ,{ useState, useEffect, useRef}from 'react';
import { AgGridColumn, AgGridReact} from 'ag-grid-react';
import { Row,Col,Table } from 'react-bootstrap';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Menu = (props) => { 

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [algoData, setAlgoData] = useState(null);
    const [deleteClick,setDeleteClick]   = useState(false);
    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
          } else {
            if(props.deleteClick==true){
                if(gridApi!=null){
                    onRemoveSelected();
                    
                }else{
                    //alert error
                }
            }
          }
        
    }, [props.deleteClick])

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
        setAlgoData([   {Title:"A",Version:"1.01",Last_Modified:"20 days ago"},
                        {Title:"B",Version:"0.01",Last_Modified:"30 days ago"},
                        {Title:"ABC",Version:"2.10",Last_Modified:"15 days ago"},
                    ])
        
    };
    const onRemoveSelected = () => {
        var selectedData = gridApi.getSelectedRows();
        var res = gridApi.applyTransaction({ remove: selectedData });
    };

    
    return (
            <Row>
            <div className="ag-theme-alpine" style={{height:800,width:1200}}>
                <AgGridReact    
                    defaultColDef={{flex: 1,minWidth: 100,editable: true,resizable: true}}
                    rowData={algoData} 
                    rowSelection={'multiple'}
                    animateRows={true}
                    onGridReady={onGridReady}
                    >
                    <AgGridColumn field =" " checkboxSelection={true}></AgGridColumn>
                    <AgGridColumn field ="Title" sortable={true} filter={true} ></AgGridColumn>
                    <AgGridColumn field ="Version" sortable={true} filter={true}></AgGridColumn>
                    <AgGridColumn field ="Last_Modified" sortable={true} filter={true}></AgGridColumn>
                </AgGridReact>
            </div>
            </Row>

    );
}
export default Menu;