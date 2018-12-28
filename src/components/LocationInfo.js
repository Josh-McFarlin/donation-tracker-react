import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

import ItemElement from './ItemElement';
import NewItemDialog from './NewItemDialog';
import firebase from '../firebase';
import { formatters } from '../helpers';


const styles = theme => ({
    root: {
        height: '100%',
        flexGrow: 1,
        pointerEvents: 'all',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 900
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    content: {
        flexGrow: 1,
        padding: 2 * theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    },
    itemListPaper: {
        marginTop: 3 * theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        width: '100%',
        flexGrow: 1
    },
    itemList: {
        width: '100%',
        height: '100%',
        overflow: 'auto'
    },
    addButton: {
        alignSelf: 'flex-end',
        marginTop: 'auto'
    }
});

class LocationInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newOpen: false,
            inventory: props.info.inventory ? Object.values(props.info.inventory) : [],
            accountType: null
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.info.name !== prevProps.info.name) {
            if (this.props.info && this.props.info.inventory) {
                this.setState({
                    inventory: Object.values(this.props.info.inventory)
                });
            }

            this.updateItems();
        }
    }

    componentDidMount() {
        this.updateItems();

        firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/accountType/').once('value').then((snapshot) => {
            const vals = snapshot.val();

            this.setState({
                accountType: vals
            });
        });
    }

    updateItems = () => {
        const { info } = this.props;

        firebase.database().ref('locations/' + info.name + '/inventory/').once('value').then((snapshot) => {
            const vals = snapshot.val();

            if (vals != null) {
                this.setState({
                    inventory: Object.values(vals)
                });
            }
        });
    };

    handleOpenNewItem = () => {
        this.setState({
            newOpen: true
        });
    };

    handleCloseNewItem = () => {
        this.setState({
            newOpen: false
        });
    };

    handleSubmitNewItem = async (values) => {
        const { info } = this.props;

        try {
            await firebase.database().ref('locations/' + info.name + '/inventory/' + values.shortDescription).set(values);
        } catch (error) {
            alert(error);
        }

        this.setState({
            newOpen: false
        });

        this.updateItems();
    };

    render() {
        const { classes, info, closeInfo } = this.props;
        const { newOpen, inventory, accountType } = this.state;

        const fullAddress = `${formatters.capitalizeWords(info.address)}, ${formatters.capitalizeWords(info.city)}, ${info.state.toUpperCase()} ${info.zip}`;

        return(
            <Paper className={classes.root}>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='h6' color='inherit' className={classes.grow}>{info.name}</Typography>
                        <IconButton
                            className={classes.menuButton}
                            color='inherit'
                            aria-label='Close'
                            onClick={closeInfo}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <div className={classes.content}>
                    <Typography variant='h6' color='inherit'>Address: { fullAddress }</Typography>
                    <Typography variant='h6' color='inherit'>Website: { info.web }</Typography>
                    <Typography variant='h6' color='inherit'>Phone: { formatters.phoneNumber(info.phoneNumber) }</Typography>
                    <Typography variant='h6' color='inherit'>Location Type: { info.type }</Typography>

                    {(info.inventory != null) &&
                        <Paper className={classes.itemListPaper}>
                            <List className={classes.itemList} disablePadding>
                                {inventory.map((item, index) =>
                                    <ItemElement info={item} key={'itemElement' + index} />
                                )}
                            </List>
                        </Paper>
                    }

                    {(accountType && accountType === 'Location Employee') &&
                        <Button
                            variant='contained'
                            color='primary'
                            className={classes.addButton}
                            onClick={this.handleOpenNewItem}
                        >Add Item to Inventory</Button>
                    }

                    <NewItemDialog location={info} open={newOpen} handleClose={this.handleCloseNewItem} handleSubmit={this.handleSubmitNewItem} />
                </div>
            </Paper>
        );
    }
}

LocationInfo.propTypes = {
    info: PropTypes.shape({
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
    closeInfo: PropTypes.func.isRequired
};

export default withStyles(styles)(LocationInfo);
