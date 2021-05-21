import React, {Component} from 'react';
import {AppBar, Box, Tab, Tabs, Typography, withStyles} from "@material-ui/core";
import * as PropTypes from "prop-types";
import EquityTab from "../Components/equityTab";
import ProfitTab from "../Components/profitTab";
import Performance from "../Components/performance";
import TradeTab from "../Components/tradeTab";
import ReportTab from "../Components/reportTab";
import Switch from "react-bootstrap/Switch";

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
        backgroundColor: theme.palette.background.paper
    }
});


class NavigationBar extends Component {

    state = {value: 0}

    render() {
        const {value} = this.state
        const {classes} = this.props
        return (

            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs
                        variant="fullWidth"
                        value={value}
                        onChange={this.handleChange}
                        aria-label="nav tabs example"
                    >
                        <LinkTab label="equity" href="/main/equity" {...a11yProps(0)} />
                        <LinkTab label="profit" href="/main/profit" {...a11yProps(1)} />
                        <LinkTab label="performance" href="/main/performance" {...a11yProps(2)} />
                        <LinkTab label="tradeActions" href="/main/tradeActions" {...a11yProps(3)} />
                        <LinkTab label="reports" href="/main/reports" {...a11yProps(4)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <EquityTab/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ProfitTab/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Performance/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <TradeTab/>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <ReportTab/>
                </TabPanel>
            </div>

        );
    }

    handleChange = (event, newValue) => {
        // this.props.changeTab(newValue);
        this.setState({value: newValue});
    };
}

// export default connect(state => ({tabNum: state.tabNum}),
//     {changeTab: changeTab})(withStyles(styles)(NavigationBar));
export default withStyles(styles)(NavigationBar)