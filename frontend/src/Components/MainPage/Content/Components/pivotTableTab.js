import React, {Component} from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import {connect} from "react-redux";

// create Plotly renderers via dependency injection
const Plot = createPlotlyComponent(window.Plotly);

// see documentation for supported input formats
let data = [];

const rx = /(\d+)|(\D+)/g;
const rd = /\d/;
const rz = /^0/;

const naturalSort = (as, bs) => {
    // nulls first
    if (bs !== null && as === null) {
        return -1;
    }
    if (as !== null && bs === null) {
        return 1;
    }

    // then raw NaNs
    if (typeof as === 'number' && isNaN(as)) {
        return -1;
    }
    if (typeof bs === 'number' && isNaN(bs)) {
        return 1;
    }

    // numbers and numbery strings group together
    const nas = Number(as);
    const nbs = Number(bs);
    if (nas < nbs) {
        return -1;
    }
    if (nas > nbs) {
        return 1;
    }

    // within that, true numbers before numbery strings
    if (typeof as === 'number' && typeof bs !== 'number') {
        return -1;
    }
    if (typeof bs === 'number' && typeof as !== 'number') {
        return 1;
    }
    if (typeof as === 'number' && typeof bs === 'number') {
        return 0;
    }

    // 'Infinity' is a textual number, so less than 'A'
    if (isNaN(nbs) && !isNaN(nas)) {
        return -1;
    }
    if (isNaN(nas) && !isNaN(nbs)) {
        return 1;
    }

    // finally, "smart" string sorting per http://stackoverflow.com/a/4373421/112871
    let a = String(as);
    let b = String(bs);
    if (a === b) {
        return 0;
    }
    if (!rd.test(a) || !rd.test(b)) {
        return a > b ? 1 : -1;
    }

    // special treatment for strings containing digits
    a = a.match(rx);
    b = b.match(rx);
    while (a.length && b.length) {
        const a1 = a.shift();
        const b1 = b.shift();
        if (a1 !== b1) {
            if (rd.test(a1) && rd.test(b1)) {
                return a1.replace(rz, '.0') - b1.replace(rz, '.0');
            }
            return a1 > b1 ? 1 : -1;
        }
    }
    return a.length - b.length;
};

const sortAs = function (order) {
    const mapping = {};

    // sort lowercased keys similarly
    const l_mapping = {};
    for (const i in order) {
        const x = order[i];
        mapping[x] = i;
        if (typeof x === 'string') {
            l_mapping[x.toLowerCase()] = i;
        }
    }
    return function (a, b) {
        if (a in mapping && b in mapping) {
            return mapping[a] - mapping[b];
        } else if (a in mapping) {
            return -1;
        } else if (b in mapping) {
            return 1;
        } else if (a in l_mapping && b in l_mapping) {
            return l_mapping[a] - l_mapping[b];
        } else if (a in l_mapping) {
            return -1;
        } else if (b in l_mapping) {
            return 1;
        }
        return naturalSort(a, b);
    };
};

class PivotTableUISmartWrapper extends Component {

    state = {pivotState: null}

    componentWillReceiveProps(nextProps) {
        const {result} = nextProps
        let {pivotState} = nextProps
        if (result !== null && result.length > 0) {
            pivotState.data = result
        }
        this.setState({pivotState: pivotState});
    }

    render() {
        return (

            <PivotTableUI
                renderers={Object.assign(
                    {},
                    TableRenderers,
                    createPlotlyRenderers(Plot)
                )}
                {...this.state.pivotState}
                onChange={s => this.setState({pivotState: s})}
                unusedOrientationCutoff={Infinity}
            />
        );
    }
}

PivotTableUISmartWrapper = connect(state => ({result: state.sideArea.result}))(PivotTableUISmartWrapper)

class PivotTableTab extends React.Component {

    state = {
        mode: 'demo',
        filename: 'Sample Dataset',
        pivotState: {
            data: data,
            rows: [],
            cols: ['MDD'],
            aggregatorName: 'Sum',
            vals: ['MDD'],
            rendererName: 'Grouped Column Chart',
            plotlyOptions: {width: '100%', height: 300},
            plotlyConfig: {},
            tableOptions: {
                clickCallback: function (e, value, filters, pivotData) {
                    const names = [];
                    pivotData.forEachMatchingRecord(filters, function (
                        record
                    ) {
                        names.push(record.MDD);
                    });
                    alert(names.join('\n'));
                },
            },
        },
    }

    render() {
        const {pivotState} = this.state
        return (
            <div>
                <div className="row">
                    <PivotTableUISmartWrapper pivotState={pivotState} />
                </div>
            </div>
        );
    }
}

export default PivotTableTab