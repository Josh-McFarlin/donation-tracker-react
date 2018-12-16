import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import moment from 'moment';

export default class NewItemDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            category: "Clothing"
        };
    }

    handleSubmitEvent = (event) => {
        event.preventDefault();

        const { location, handleSubmit } = this.props;
        const { category } = this.state;
        const { shortDescription, fullDescription, value } = event.target.elements;

        handleSubmit({
            shortDescription: shortDescription.value,
            category,
            fullDescription: fullDescription.value,
            location: location.name,
            value: value.value,
            timeStamp: moment().format('YYYY-MM-DD HH:mm:ss')
        });
    };

    render() {
        const { open, handleClose } = this.props;
        const { category } = this.state;

        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <form onSubmit={this.handleSubmitEvent} autoComplete="off">
                    <DialogTitle id="form-dialog-title">Create New Item In Inventory</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="normal"
                            id="shortDescription"
                            label="Item Name"
                            type="text"
                            fullWidth
                        />

                        <FormControl fullWidth>
                            <InputLabel htmlFor="category">Category</InputLabel>
                            <Select
                                value={category}
                                onChange={(e) => this.setState({ category: e.target.value })}
                                inputProps={{
                                    name: 'category',
                                    id: 'category'
                                }}
                            >
                                <MenuItem value="Clothing">Clothing</MenuItem>
                                <MenuItem value="Shoes">Shoes</MenuItem>
                                <MenuItem value="Hats">Hats</MenuItem>
                                <MenuItem value="Accessories">Accessories</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            margin="normal"
                            id="fullDescription"
                            label="Item Description"
                            type="text"
                            fullWidth
                        />

                        <TextField
                            margin="normal"
                            id="value"
                            label="Item Price"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button color="primary" type="submit">Create Item</Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}
