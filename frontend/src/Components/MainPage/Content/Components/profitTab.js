import React, {Component} from "react";
import * as echarts from "echarts";

export default class ProfitTab extends Component {
    componentDidMount() {
        this.equityCurve = echarts.init(this.profit)
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            title: {
                text: 'Profit By Time'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'Profit'
                }
            ],
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 100
            }, {
                start: 0,
                end: 20
            }],
            series: [
                {
                    name: 'Profit',
                    type: 'bar',
                    barWidth: '50%',
                    data: [10, 52, 200, 334, 390, 330, 220]
                }
            ]
        };

        this.equityCurve.setOption(option);

    }

    render() {
        return (
            <div id='equity' ref={c => this.profit = c} style={{width: '100%', height: '500px'}}/>
        );
    }
}