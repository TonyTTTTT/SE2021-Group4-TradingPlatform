import React from 'react';
import { AgGridColumn, AgGridReact} from 'ag-grid-react';
import { Row,Col,Table } from 'react-bootstrap';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    algoData(){
        const algoData =[
            {Title: "A",Version:"0.01",Last_Modified:"20 days ago"},
            {Title: "B",Version:"1.00",Last_Modified:"1 month ago"},
            {Title: "C",Version:"1.02",Last_Modified:"4 month ago"}
        ]
        
        return algoData;
    }
    render() {
        return (
            <Row>
            <div className="ag-theme-alpine" style={{height:800,width:1200}}>
                <AgGridReact rowData={this.algoData()}>
                    <AgGridColumn field =" " checkboxSelection={true}></AgGridColumn>
                    <AgGridColumn field ="Title" sortable={true} filter={true} ></AgGridColumn>
                    <AgGridColumn field ="Version" sortable={true} filter={true}></AgGridColumn>
                    <AgGridColumn field ="Last_Modified" sortable={true} filter={true}></AgGridColumn>
                </AgGridReact>
            </div>
            </Row>

        );
    }
}
export default Menu;