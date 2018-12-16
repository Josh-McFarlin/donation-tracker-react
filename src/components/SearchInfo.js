import React from "react";
import { Typography, Paper, IconButton, List } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Close } from "@material-ui/icons";

import ItemElement from "./ItemElement";
import firebase from "../firebase";


const styles = theme => ({
    infoDialog: {
        height: "100%",
        flexGrow: 1,
        pointerEvents: "all",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        zIndex: 500
    },
    closeButton: {
        pointerEvents: "all",
        position: "absolute",
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
        display: "flex",
        flexDirection: "column",
        position: "relative"
    },
    itemListPaper: {
        width: "100%",
        flexGrow: 1
    },
    itemList: {
        width: "100%",
        height: "100%",
        overflowY: "auto"
    },
    addButton: {
        alignSelf: "flex-end",
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
            console.log("changed", this.props.searchTerm, prevProps.searchTerm);
            //this.searchItems(this.props.searchTerm);
        }
    }

    componentDidMount() {
        this.searchItems(this.props.searchTerm);
    }

    searchItems = (searchTerm) => {
        let allItems = [];

        firebase.database().ref('locations/').once('value').then(function(snapshot) {
            const locations = snapshot.val();

            if (locations) {
                const locationsList = Object.values(locations);

                locationsList.forEach((location) => {
                    firebase.database().ref("locations/" + location.name + "/inventory/").once('value').then(function (snapshot) {
                        const items = snapshot.val();

                        if (items) {
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
        }.bind(this));
    };

    render() {
        let { classes, searchTerm, closeInfo } = this.props;
        let { searchItems } = this.state;

        console.log("rerender", "search term: " + searchTerm);

        return(
            <Paper className={classes.infoDialog}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>Search: {searchTerm}</Typography>
                        <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Close"
                            onClick={closeInfo}
                        >
                            <Close />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <div className={classes.content}>
                    <Paper className={classes.itemListPaper}>
                        <List className={classes.itemList} disablePadding>
                            {console.log("search items", searchItems)}
                            {
                                searchItems.map((item, index) => {
                                    console.log("making se for", item);
                                    return <ItemElement
                                        info={item}
                                        key={"searchItemElement" + index}
                                        showLocation
                                        onClick={() => console.log("click")}
                                    />;
                                })
                            }
                        </List>
                    </Paper>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(SearchInfo);
