import React, {Component} from 'react';
import * as echarts from "echarts";
import axios from "axios";

export default class EquityTab extends Component {

    run = (_rawData) => {
        const countries = ['Finland', 'France', 'Germany', 'Iceland', 'Norway', 'Poland', 'Russia', 'United Kingdom'];
        const datasetWithFilters = [];
        const seriesList = [];
        echarts.util.each(countries, function (country) {
            const datasetId = 'dataset_' + country;
            datasetWithFilters.push({
                id: datasetId,
                fromDatasetId: 'dataset_raw',
                transform: {
                    type: 'filter',
                    config: {
                        and: [
                            {dimension: 'Year', gte: 1950},
                            {dimension: 'Country', '=': country}
                        ]
                    }
                }
            });
            seriesList.push({
                type: 'line',
                datasetId: datasetId,
                showSymbol: false,
                name: country,
                endLabel: {
                    show: true,
                    formatter: function (params) {
                        return params.value[3] + ': ' + params.value[0];
                    }
                },
                labelLayout: {
                    moveOverlap: 'shiftY'
                },
                emphasis: {
                    focus: 'series'
                },
                encode: {
                    x: 'Year',
                    y: 'Income',
                    label: ['Country', 'Income'],
                    itemName: 'Year',
                    tooltip: ['Income'],
                }
            });
        });


        const option = {
            animationDuration: 10000,
            dataset: [{
                id: 'dataset_raw',
                source: _rawData
            }].concat(datasetWithFilters),
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
                name: 'Income'
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

        const ROOT_PATH = '/api1/examples';
        axios.get(ROOT_PATH + '/data/asset/data/life-expectancy-table.json').then(
            response => {
                this.run(response.data)
                // console.log(response.data)
            },
            error => console.log(error.message)
        )

    }

    render() {
        return (
            <div id='equity' ref={c => this.equity = c} style={{width: '800px', height: '600px'}}/>
        );
    }
}