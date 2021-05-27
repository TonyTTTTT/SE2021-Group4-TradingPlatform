import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import SideArea from "./SideArea/sideArea"
import TagArea from "./TagArea/tagArea"
import Console from "./Console/console"
import NavigationBar from "./Content/NavigationBar/navigationBar";
import EquityTab from "./Content/Components/equityTab";
import ProfitTab from "./Content/Components/profitTab";
import Performance from "./Content/Components/performance";
import TradeTab from "./Content/Components/tradeTab";
import ReportTab from "./Content/Components/reportTab";
import {connect} from "react-redux";
import PivotTableTab from "./Content/Components/pivotTableTab";

const tabs = [
    createData('Equity', <EquityTab/>),
    createData('Profit', <ProfitTab/>),
    createData('Performance', <Performance/>),
    createData('TradeActions', <TradeTab/>),
    createData('Reports', <ReportTab/>)
]

const batchTabs = [
    createData('ResultList', <TradeTab/>),
    createData('PivotTable', <PivotTableTab/>)
]

function createData(label, content) {
    return {label, content};
}

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {algoId} = this.props
        return (
            <Container fluid style={{height: window.innerHeight, width: window.innerWidth}}>
                <Row style={{height: "100%"}}>
                    <Col sm={4} style={{height: "100%", width: "100%"}}>
                        <SideArea/>
                        <TagArea/>
                    </Col>
                    <Col sm={8} style={{height: "100%", width: "100%"}}>
                        <NavigationBar tabs={batchTabs}/>
                        <Console/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default MainPage;