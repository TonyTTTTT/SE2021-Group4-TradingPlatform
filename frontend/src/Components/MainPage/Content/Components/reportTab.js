import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Checkbox,
    IconButton,
    lighten,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Tooltip,
    Typography,
    withStyles
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from "clsx";
import {Edit} from "@material-ui/icons";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Report from "./report";
import ReportDialog from "./reportDialog";
import axios from "axios";
import {connect} from "react-redux";
import {sendLogAction} from "../../../../actions";

function createData(title, lastModified, id) {
    return {title, lastModified, id};
}

/*let rows = [
    createData('Eclair', "Mayday 5th, 2021", 1),
    createData('Cupcake', "April 1rd, 2020", 2),
    createData('Gingerbread', "Mayday 4th, 2017", 3),
];*/

class EnhancedTableHead extends Component {
    render() {
        const {onSelectAllClick, numSelected, rowCount} = this.props;
        const headCells = [
            {id: 'title', numeric: false, disablePadding: true, label: 'Title'},
            {id: 'lastModified', numeric: false, disablePadding: false, label: 'Last Modified'},
            {id: 'edit', numeric: false, disablePadding: false, label: 'Edit'},
        ];
        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{'aria-label': 'select all reports'}}
                        />
                    </TableCell>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.id === 'title' ? 'left' : 'right'}
                            padding={headCell.disablePadding ? 'none' : 'default'}
                        >
                            {headCell.label}
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
    onSelectAllClick: PropTypes.func.isRequired,
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

    handleDelete = () => {
        this.props.handleDelete()
    }

    handleAddReport = () => {
        this.props.handleAddReport()
    }

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
                        Reports
                    </WhiteTypography>
                )}

                {numSelected > 0 ? (
                    <Tooltip title="Delete" onClick={this.handleDelete}>
                        <IconButton aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Add Report" onClick={this.handleAddReport}>
                        <IconButton aria-label="add report">
                            <AddCircleOutlineIcon/>
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

class ReportTab extends Component {

    componentDidMount() {
        const {algoId} = this.props
        axios.get('/api2/get-report-list', {params: {algo_id: algoId}}).then(
            response => {
                const {data: {data, code, msg}} = response
                this.setState({rows: data})
                this.props.sendLog({time: Date.now(), level: code, text: msg})
                // console.log(rows)
            },
            error => this.props.sendLog({time: Date.now(), level: 0, text: error.message})
        )
    }

    state = {
        selected: [],
        editFilename: '',
        editMode: false,
        openDialog: false,
        rows: []
    }

    handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const {rows} = this.state
            const newSelecteds = rows.map((n) => n.id);
            this.setState({selected: newSelecteds})
            return;
        }
        this.setState({selected: []})
    };

    handleClick = (event, name) => {
        const {selected} = this.state
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
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

    handleEdit = (reportId, title) => {
        axios.get('/api2/get-report/' + reportId).then(
            response => {
                if (response.data.code === 2) {
                    const text = response.data.data
                    this.setState({editFilename: title, editReportId: reportId, editMode: true, text})
                } else {
                    const {data: {code, msg}} = response
                    this.props.sendLog({time: Date.now(), level: code, text: msg})
                    // console.log(response.data.msg)
                }
            },
            error => this.props.sendLog({time: Date.now(), level: 0, text: error.message})
        )
    }

    closeEdit = (content) => {
        const {editFilename, editReportId} = this.state
        axios.post('/api2/save-report', {report_id: editReportId, content}).then(
            response => {
                if (response.data.code === 2) {
                    this.setState({editFilename: '', editReportId: null})
                } else {
                    const {data: {code, msg}} = response
                    this.props.sendLog({time: Date.now(), level: code, text: msg})
                    // console.log(response.data.msg)
                }
            },
            error => {
                this.props.sendLog({time: Date.now(), level: 0, text: error.message})
            }
        )
        this.setState({editMode: false})
    }

    addReport = (title) => {
        if (title.length > 0) {
            let formData = new FormData();
            const {algoId} = this.props
            formData.append('title', title);
            formData.append('algo_id', algoId)
            console.log(algoId)
            axios.post('/api2/create-report', formData,
                {headers: {"Content-Type": "multipart/form-data"}},).then(
                response => {
                    if (response.data.code === 2) {
                        const {data: {data, code, msg}} = response
                        const {rows} = this.state
                        const newRows = [...rows, createData(title, new Date().toLocaleString(), data)]
                        // console.log(data)
                        this.props.sendLog({time: Date.now(), level: code, text: msg})
                        this.setState({rows: newRows})
                    } else {
                        const {data: {code, msg}} = response
                        this.props.sendLog({time: Date.now(), level: code, text: msg})
                    }
                },
                error => {
                    this.props.sendLog({time: Date.now(), level: 0, text: error.message})
                }
            )
        }
        this.setState({openDialog: false})
    }

    showDialog = () => {
        this.setState({openDialog: true})
    }

    deleteReport = () => {
        const {selected} = this.state
        if (selected.length > 0) {
            const {rows} = this.state
            let newRows = rows
            selected.map(report_id => {
                    axios.delete('/api2/delete-report/' + report_id).then(
                        response => {
                            console.log(response.data.msg)
                            const {data: {code, msg}} = response
                            this.props.sendLog({time: Date.now(), level: code, text: msg})
                            newRows = newRows.filter(value => value.id !== report_id)
                            this.setState({rows: newRows, selected: []})
                        },
                        error => this.props.sendLog({time: Date.now(), level: 0, text: error.message})
                    )
                }
            )
        }
    }

    isSelected = (name) => this.state.selected.indexOf(name) !== -1;

    render() {
        const {classes} = this.props
        const {selected, editMode, editFilename, editReportId, openDialog, rows, text} = this.state
        const rowsPerPage = rows.length
        const emptyRows = rowsPerPage - rows.length;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar numSelected={selected.length} handleAddReport={this.showDialog}
                                          handleDelete={this.deleteReport}/>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size='medium'
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                onSelectAllClick={this.handleSelectAllClick}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {rows.map((row, index) => {
                                    const isItemSelected = this.isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            // role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    onClick={(event) => this.handleClick(event, row.id)}
                                                    checked={isItemSelected}
                                                    inputProps={{'aria-labelledby': labelId}}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.title}
                                            </TableCell>
                                            <TableCell align="right">{row.lastModified}</TableCell>
                                            <TableCell align="right" onClick={() => this.handleEdit(row.id, row.title)}><Edit/></TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow style={{height: 53 * emptyRows}}>
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                {editMode ? <Report filename={editFilename}
                                    text={text}
                                    close={this.closeEdit}
                /> : ''}
                <ReportDialog open={openDialog} handleClose={this.addReport}/>
            </div>
        );
    }
}

export default connect(state => ({algoId: state.menu.selectedAlgoID}), {sendLog: sendLogAction})(withStyles(styles)(ReportTab));
