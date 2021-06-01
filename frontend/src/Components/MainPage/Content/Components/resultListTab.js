import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Checkbox, FormControlLabel, IconButton, lighten, Paper, Table, TableBody,
    TableCell, TableContainer,
    TableHead, TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Tooltip,
    Typography, withStyles
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import clsx from "clsx";
import Switch from "react-bootstrap/Switch";
import {connect} from "react-redux";

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

class EnhancedTableHead extends Component {
    render() {
        const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, rowName} = this.props;
        const headCells = rowName.map(name => ({id: name, numeric: true, disablePadding: false, label: name}))
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };
        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{'aria-label': 'select all desserts'}}
                        />
                    </TableCell>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.id === 'id' ? 'left' : 'right'}
                            padding={headCell.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = (theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        background: 'linear-gradient(45deg, #1597bb 30%, #8fd6e1 90%)',
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
});

const WhiteTypography = withStyles({
        root: {
            color: '#FFFFFF'
        }
    }
)(Typography)

class EnhancedTableToolbar extends Component {
    render() {
        const {classes} = this.props
        const {numSelected} = this.props;
        return (
            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                {numSelected > 0 ? (
                    <WhiteTypography className={classes.title} color="inherit" variant="subtitle1" component="div">
                        {numSelected} selected
                    </WhiteTypography>
                ) : (
                    <WhiteTypography className={classes.title} variant="h6" id="tableTitle" component="div">
                        Trade Actions
                    </WhiteTypography>
                )}

                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon/>
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        );
    };
}

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
const styles = theme => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
});

let rows = [];

class ResultListTab extends Component {

    state = {
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        page: 0,
        dense: false,
        rowsPerPage: 5
    }

    handleRequestSort = (event, property) => {
        const isAsc = this.orderBy === property && this.order === 'asc';
        this.setState({order: isAsc ? 'desc' : 'asc'});
        this.setState({orderBy: property})
    };

    handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            this.setState({selected: newSelecteds})
            return;
        }
        this.setState({selected: []})
    };

    handleClick = (event, time_stamp) => {
        const {selected} = this.state
        const selectedIndex = selected.indexOf(time_stamp);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, time_stamp);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        this.setState({selected: newSelected})
    };

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage})
    };

    handleChangeRowsPerPage = (event) => {
        const {target: {value}} = event
        this.setState({rowsPerPage: parseInt(value, 10), page: 0})
    };

    handleChangeDense = (event) => {
        const {target: {checked}} = event
        this.setState({dense: checked})
    };

    isSelected = (name) => this.state.selected.indexOf(name) !== -1;

    render() {
        const {classes} = this.props
        const {result} = this.props
        if (result !== null) {
            rows = result.map((item, index) =>
                ({id: index, ...item})
            )
        }
        const {rowsPerPage, dense, order, orderBy, page, selected} = this.state
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        return (
            <div className={classes.root} style={{display: result === null ? 'none' : 'inline'}}>
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar numSelected={selected.length}/>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={rows.length}
                                rowName={rows.length > 0 ? Object.keys(rows[0]) : []}
                            />
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = this.isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => this.handleClick(event, row.id)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{'aria-labelledby': labelId}}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                                    {row.id}
                                                </TableCell>
                                                {Object.keys(row).filter(key => key !== "id").map(key =>
                                                    <TableCell align='right'>{row[key]}</TableCell>
                                                )}
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={this.handleChangeDense}/>}
                    label="Dense padding"
                />
            </div>
        );
    }
}

export default connect(state => ({result: state.sideArea.result}))(withStyles(styles)(ResultListTab));
