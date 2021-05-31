import React, {Component} from "react";
import * as echarts from "echarts";
import {connect} from "react-redux";
import {withTheme} from "@material-ui/core/styles";
import {MobileStepper, Paper, Typography, withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";

class ProfitBar extends Component {

    state = {'period': 'month'}

    componentDidMount() {
        this.profitBar = echarts.init(this.profit)
        const {result} = this.props
        if (result !== null) {
            this.setProfitBar(result);
        }
    }

    setProfitBar(result) {
        const {period} = this.props;
        const {cumulateResults: {m_results, q_results, y_results}} = result;
        let show_result = null;
        if (period === 'Monthly') {
            show_result = m_results;
        } else if (period === 'Quarterly') {
            show_result = q_results;
        } else {
            show_result = y_results;
        }
        const {time, real_profit} = show_result

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
                    data: time,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: period + ' Profit'
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
                    data: real_profit
                }
            ]
        };

        this.profitBar.setOption(option);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {result} = this.props
        if (result !== null) {
            this.setProfitBar(result);
        }
    }

    render() {
        return (
            <div id='equity' ref={c => this.profit = c} style={{width: '100%', height: '500px'}}/>
        );
    }
}

const styles = (theme) => ({
    root: {
        maxHeight: '500px',
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    }
});

class ProfitTab extends Component {

    state = {activeStep: 0}

    handleNext = () => {
        const {activeStep} = this.state
        this.setState({activeStep: activeStep + 1})
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    handleBack = () => {
        const {activeStep} = this.state
        this.setState({activeStep: activeStep - 1})
        // setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    render() {
        const {classes} = this.props;
        const maxSteps = 3;

        const {activeStep} = this.state
        const {theme, result} = this.props
        const labels = ['Monthly', 'Quarterly', 'Yearly']
        return (
            <div className={classes.root} style={{display: result === null ? 'none' : 'inline'}}>
                {/*<Paper square elevation={0} className={classes.header}>*/}
                {/*    <Typography>{labels[activeStep]}</Typography>*/}
                {/*</Paper>*/}
                <ProfitBar period={labels[activeStep]} result={result}/>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    variant="text"
                    activeStep={activeStep}
                    nextButton={
                        <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                            Next
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                            Back
                        </Button>
                    }
                />
            </div>
        );
    }
}

export default connect(state => ({result: state.sideArea.result}))(withTheme(withStyles(styles)(ProfitTab)))
