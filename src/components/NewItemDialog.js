import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

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


class NewItemDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            category: 'Clothing'
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

    inputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { open, handleClose } = this.props;
        const { category } = this.state;

        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'
            >
                <form onSubmit={this.handleSubmitEvent} autoComplete='off'>
                    <DialogTitle id='form-dialog-title'>Create New Item In Inventory</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin='normal'
                            id='shortDescription'
                            label='Item Name'
                            type='text'
                            fullWidth
                        />

                        <FormControl fullWidth>
                            <InputLabel htmlFor='category'>Category</InputLabel>
                            <Select
                                name='category'
                                value={category}
                                onChange={this.inputChange}
                                inputProps={{
                                    name: 'category',
                                    id: 'category'
                                }}
                            >
                                <MenuItem value='Clothing'>Clothing</MenuItem>
                                <MenuItem value='Shoes'>Shoes</MenuItem>
                                <MenuItem value='Hats'>Hats</MenuItem>
                                <MenuItem value='Accessories'>Accessories</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            margin='normal'
                            id='fullDescription'
                            label='Item Description'
                            type='text'
                            fullWidth
                        />

                        <TextField
                            margin='normal'
                            id='value'
                            label='Item Price'
                            type='text'
                            fullWidth
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} color='primary'>Cancel</Button>
                        <Button color='primary' type='submit'>Create Item</Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

NewItemDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    location: PropTypes.shape({
        address: PropTypes.string,      // '309 EDGEWOOD AVE '
        city: PropTypes.string,         // 'Atlanta'
        id: PropTypes.number,           // 1
        inventory: PropTypes.object,    // { Jeans: {…}, 'Phillies hat': {…}, 'pink sweater': {…}, … }
        latitude: PropTypes.number,     // 33.75416
        longitude: PropTypes.number,    // -84.37742
        name: PropTypes.string,         // 'AFD Station 4'
        PhoneNumber: PropTypes.string,  // '(404) 555 - 3456'
        state: PropTypes.string,        // 'GA'
        type: PropTypes.string,         // 'Drop Off'
        web: PropTypes.string,          // 'www.afd04.atl.ga'
        zip: PropTypes.oneOfType([      // 30332
            PropTypes.string,
            PropTypes.number
        ])
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default NewItemDialog;
