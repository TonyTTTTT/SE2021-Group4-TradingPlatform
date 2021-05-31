import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withTheme} from '@material-ui/core/styles';
import {Toolbar, Typography, withStyles} from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {connect} from "react-redux";

const styles1 = (theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
});

class TablePaginationActions extends Component {
    // const classes = useStyles1();

    handleFirstPageButtonClick = (event) => {
        const {onChangePage} = this.props;
        onChangePage(event, 0);
    };

    handleBackButtonClick = (event) => {
        const {onChangePage, page} = this.props;
        onChangePage(event, page - 1);
    };

    handleNextButtonClick = (event) => {
        const {onChangePage, page} = this.props;
        onChangePage(event, page + 1);
    };

    handleLastPageButtonClick = (event) => {
        const {onChangePage, count, rowsPerPage} = this.props
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    render() {

        const {count, page, rowsPerPage, classes, theme} = this.props;
        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
                </IconButton>
                <IconButton onClick={this.handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                    {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
                </IconButton>
            </div>
        );
    }
}

TablePaginationActions = withTheme(withStyles(styles1)(TablePaginationActions))

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const styles2 = (theme) => ({
    table: {
        minWidth: 500,
    }
});

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow)

const toolbarStyles = (theme) => ({
    root: {
        background: 'linear-gradient(45deg, #1597bb 30%, #8fd6e1 90%)',
    }
})

const StyledToolbar = withStyles(toolbarStyles)(Toolbar)

const WhiteTypography = withStyles({
        root: {
            color: '#FFFFFF'
        }
    }
)(Typography)

class Performance extends Component {

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage})
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({page: 0, rowsPerPage: parseInt(event.target.value, 10)})
    };

    state = {page: 0, rowsPerPage: 5}

    render() {
        const {result} = this.props
        let rows = [];
        if (result !== null) {
            const {tradeStats} = result
            rows = tradeStats
        }
        const {classes} = this.props;
        const {page, rowsPerPage} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

        return (
            <TableContainer component={Paper} style={{display: result === null ? 'none' : 'inline'}}>
                <StyledToolbar>
                    <WhiteTypography variant="h6" id="tableTitle" component="div">
                        Performance
                    </WhiteTypography>
                </StyledToolbar>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableBody>
                        {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                        ).map((row) => (
                            <StyledTableRow key={row.stat} hover>
                                <TableCell component="th" scope="row">
                                    {row.stat}
                                </TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    {row.value}
                                </TableCell>
                            </StyledTableRow>
                        ))}

                        {emptyRows > 0 && (
                            <StyledTableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </StyledTableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                colSpan={3}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {'aria-label': 'rows per page'},
                                    native: true,
                                }}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        );
    }
}

export default connect(state => ({result: state.sideArea.result}))(withStyles(styles2)(Performance))