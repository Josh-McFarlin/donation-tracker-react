import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

import ItemElement from './ItemElement';
import firebase from '../firebase';


const styles = theme => ({
    infoDialog: {
        height: '100%',
        flexGrow: 1,
        pointerEvents: 'all',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 500
    },
    closeButton: {
        pointerEvents: 'all',
        position: 'absolute',
        top: 0,
        right: 0
    },
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    content: {
        flexGrow: 1,
        padding: 2 * theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    },
    itemListPaper: {
        width: '100%',
        flexGrow: 1
    },
    itemList: {
        width: '100%',
        height: '100%',
        overflowY: 'auto'
    },
    addButton: {
        alignSelf: 'flex-end',
        marginTop: theme.spacing.unit
    }
});

class SearchInfo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            searchItems: []
        };
    }

    /*
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.searchTerm !== nextProps.searchTerm) {
            console.log(this.props.searchTerm, nextProps.searchTerm);
            return true;
        }

        if (this.state.searchItems.length !== nextState.searchItems.length) {
            return true;
        }

        return false;
    }
    */

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.searchTerm !== prevProps.searchTerm) {
            console.log('changed', this.props.searchTerm, prevProps.searchTerm);
            //this.searchItems(this.props.searchTerm);
        }
    }

    componentDidMount() {
        this.searchItems(this.props.searchTerm);
    }

    searchItems = (searchTerm) => {
        let allItems = [];

        firebase.database().ref('locations/').once('value').then((snapshot) => {
            const locations = snapshot.val();

            if (locations) {
                const locationsList = Object.values(locations);

                locationsList.forEach((location) => {
                    firebase.database().ref('locations/' + location.name + '/inventory/').once('value').then((snapshot) => {
                        const items = snapshot.val();

                        if (items != null) {
                            const itemsList = Object.values(items);

                            itemsList.forEach((item) => {
                                if (item.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    allItems.push(item);
                                }
                            });
                        }
                    });
                });
            }

            this.setState({
                searchItems: allItems
            });
        });
    };

    render() {
        const { classes, searchTerm, closeInfo } = this.props;
        const { searchItems } = this.state;

        return(
            <Paper className={classes.infoDialog}>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='h6' color='inherit' className={classes.grow}>Search: {searchTerm}</Typography>
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
                    <Paper className={classes.itemListPaper}>
                        <List className={classes.itemList} disablePadding>
                            {searchItems.map((item, index) =>
                                <ItemElement
                                    info={item}
                                    key={'searchItemElement' + index}
                                    showLocation
                                />
                            )}
                        </List>
                    </Paper>
                </div>
            </Paper>
        );
    }
}

SearchInfo.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    closeInfo: PropTypes.func.isRequired
};

export default withStyles(styles)(SearchInfo);
