import React, {Component} from 'react';
import {AppBar, Box, Container, Tab, Tabs, Typography, withStyles} from "@material-ui/core";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {setResultAction} from "../../../../actions";

class TabPanel extends Component {
    render() {
        const {children, value, index, ...other} = this.props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`nav-tabpanel-${index}`}
                aria-labelledby={`nav-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

class LinkTab extends Component {
    render() {
        return (
            <Tab
                component="a"
                onClick={(event) => {
                    event.preventDefault();
                }}
                {...this.props}
            />
        );
    }
}

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background
    }
});


function processTrade(tradeResult) {
    let totalProfit = 0
    return tradeResult.map((trade, index) => {
        const {profit} = trade
        totalProfit += profit
        return {...trade, totalProfit}
    })
}

class NavigationBar extends Component {

    state = {value: 0}

    render() {
        if (this.props.result !== null) {
            const {tradeResults} = this.props.result
            const tradeActions = processTrade(tradeResults)
            this.props.setResult(tradeActions)
            console.log(tradeActions)
        }
        const {value} = this.state
        const {classes, tabs} = this.props
        return (
            <Container className={classes.root}>
                <AppBar position="static">
                    <Tabs
                        variant="fullWidth"
                        value={value}
                        onChange={this.handleChange}
                        aria-label="nav tabs example"
                    >
                        {tabs.map((tab, index) => <LinkTab label={tab.label} {...a11yProps(index)} />)}
                    </Tabs>
                </AppBar>

                {tabs.map((tab, index) => (<TabPanel value={value} index={index}>
                    {tab.content}
                </TabPanel>))}
            </Container>

        );
    }

    handleChange = (event, newValue) => {
        // this.props.changeTab(newValue);
        this.setState({value: newValue});
    };
}

export default connect(state => ({result: state.sideArea.result}), {setResult: setResultAction})(withStyles(styles)(NavigationBar))