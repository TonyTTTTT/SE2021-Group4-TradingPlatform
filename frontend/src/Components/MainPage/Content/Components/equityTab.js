import React, {Component} from 'react';
import * as echarts from "echarts";
import {connect} from "react-redux";

class EquityTab extends Component {

    run = (_rawData) => {

        const countries = ['Equity'];
        const seriesList = [];
        echarts.util.each(countries, function (country) {
            const datasetId = 'dataset_' + country;
            seriesList.push({
                type: 'line',
                datasetId: datasetId,
                showSymbol: false,
                name: country,
                labelLayout: {
                    moveOverlap: 'shiftY'
                },
                emphasis: {
                    focus: 'series'
                },
                encode: {
                    x: 'time',
                    y: 'totalProfit',
                    label: ['Equity', 'TotalProfit'],
                    itemName: 'time',
                    tooltip: ['totalProfit', 'price', 'net_position'],
                }
            });
        });


        const option = {
            animationDuration: 1000,
            dataset: [{
                id: 'dataset_Equity',
                source: _rawData
            }],
            title: {
                text: 'Equity Curve'
            },
            tooltip: {
                order: 'valueDesc',
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                nameLocation: 'middle'
            },
            yAxis: {
                name: 'Total Profit'
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 100
            }, {
                start: 0,
                end: 20
            }],
            grid: {
                right: 140
            },
            series: seriesList
        };

        this.equityCurve.setOption(option);
    }

    componentDidMount() {
        this.equityCurve = echarts.init(this.equity)
        let {tradeActions} = this.props
        if (tradeActions.length > 0) {
            tradeActions = tradeActions.map(trade => {
                const {is_enter, is_long, net_position, price, product_id, profit, time, totalProfit} = trade
                return [is_enter, is_long, net_position, price, product_id, profit, time, totalProfit]
            })
            tradeActions.unshift(['is_enter', 'is_long', 'net_position', 'price', 'product_id', 'profit', 'time', 'totalProfit'])
            console.log(tradeActions)
            this.run(tradeActions)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let {tradeActions} = this.props
        if (tradeActions.length > 0) {
            tradeActions = tradeActions.map(trade => {
                const {is_enter, is_long, net_position, price, product_id, profit, time, totalProfit} = trade
                return [is_enter, is_long, net_position, price, product_id, profit, time, totalProfit]
            })
            tradeActions.unshift(['is_enter', 'is_long', 'net_position', 'price', 'product_id', 'profit', 'time', 'totalProfit'])
            console.log(tradeActions)
            this.run(tradeActions)
        }
    }

    render() {
        return (
            <div id='equity' ref={c => this.equity = c} style={{width: '100%', height: '500px'}}/>
        );
    }
}

export default connect(state => ({tradeActions: state.content.tradeActions}))(EquityTab)