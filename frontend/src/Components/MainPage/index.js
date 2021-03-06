import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import SideArea from "./SideArea/sideArea"
import Console from "./Console/console"
import NavigationBar from "./Content/NavigationBar/navigationBar";
import EquityTab from "./Content/Components/equityTab";
import ProfitTab from "./Content/Components/profitTab";
import Performance from "./Content/Components/performance";
import TradeTab from "./Content/Components/tradeTab";
import ReportTab from "./Content/Components/reportTab";
import PivotTableTab from "./Content/Components/pivotTableTab";
import {setAlgoAction} from "../../actions";
import {connect} from "react-redux";
import ResultListTab from "./Content/Components/resultListTab";

const tabs = [
    createData('Equity', <EquityTab/>),
    createData('Profit', <ProfitTab/>),
    createData('Performance', <Performance/>),
    createData('TradeActions', <TradeTab/>),
    createData('Reports', <ReportTab/>)
]

const batchTabs = [
    createData('ResultList', <ResultListTab/>),
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
        const {match: {params: {algoId}}, testType} = this.props
        this.props.setAlgoId({AlgoID: parseInt(algoId)})
        return (
            <Container fluid style={{height: window.innerHeight, width: window.innerWidth}}>
                <Row style={{height: "100%"}}>
                    <Col sm={4} style={{height: "100%", width: "100%"}}>
                        <SideArea/>
                    </Col>
                    <Col sm={8} style={{height: "100%", width: "100%"}}>
                        <div style={{height: "calc(100% - 200px)"}}>
                            <NavigationBar tabs={testType === 'batch' ? batchTabs : tabs}/>
                        </div>
                        <Console/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect(state => ({testType: state.sideArea.testType}), {setAlgoId: setAlgoAction})(MainPage);
