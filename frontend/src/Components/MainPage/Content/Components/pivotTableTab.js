import React, {Component} from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import {Container} from "@material-ui/core";

// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plotly);

// see documentation for supported input formats
const data = [['attribute', 'attribute2'], ['value1', 'value2']];

export default class PivotTableTab extends Component {

    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (

            <PivotTableUI
                data={data}
                onChange={s => this.setState(s)}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                {...this.state}/>

        );
    }
}