import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class ReportDialog extends Component {

    state = {title: ''}

    handleClose = (add, title) => {
        if (add) {
            title = title.trim()
            if (title.length > 0) {
                this.props.handleClose(title)
            }
        } else {
            this.props.handleClose('')
        }
        this.setState({title: ''});
    }

    handleTextChange = (event) => {
        const {target} = event
        this.setState({title: target.value})
    }

    render() {
        const {open} = this.props;
        const {title} = this.state
        return (
            <div>
                <Dialog open={open} onClose={() => this.handleClose(false)} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add A New Report</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter your report title here. We will create a new report.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Report Title"
                            type="text"
                            fullWidth
                            helperText='Can not be empty.'
                            onChange={this.handleTextChange}
                            error={title.trim().length === 0}
                            ref={c => this.titleField = c}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleClose(true, title)} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
