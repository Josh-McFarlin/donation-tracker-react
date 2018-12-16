import React from "react";
import { Typography, Paper, IconButton, List, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Close } from "@material-ui/icons";

import ItemElement from "./ItemElement";
import NewItemDialog from "./NewItemDialog";
import firebase from "../firebase";


const styles = theme => ({
    infoDialog: {
        height: "100%",
        flexGrow: 1,
        pointerEvents: "all",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        zIndex: 900
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
        marginRight: 20
    },
    content: {
        flexGrow: 1,
        padding: 2 * theme.spacing.unit,
        display: "flex",
        flexDirection: "column",
        position: "relative"
    },
    itemListPaper: {
        marginTop: 3 * theme.spacing.unit,
        width: "100%",
        flexGrow: 1
    },
    itemList: {
        width: "100%",
        height: "100%",
        overflow: "auto"
    },
    addButton: {
        alignSelf: "flex-end",
        marginTop: theme.spacing.unit
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

        firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/accountType/").once('value').then(function (snapshot) {
            const vals = snapshot.val();

            this.setState({
                accountType: vals
            });
        }.bind(this));
    }

    updateItems = () => {
        const { info } = this.props;

        firebase.database().ref("locations/" + info.name + "/inventory/").once('value').then(function (snapshot) {
            const vals = snapshot.val();

            if (vals) {
                this.setState({
                    inventory: Object.values(vals)
                });
            }
        }.bind(this));
    };

    handleOpenNI = () => {
        this.setState({
            newOpen: true
        });
    };

    handleCloseNI = () => {
        this.setState({
            newOpen: false
        });
    };

    handleSubmitNI = async (values) => {
        const { info } = this.props;

        try {
            await firebase.database().ref("locations/" + info.name + "/inventory/" + values.shortDescription).set(values);
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

        /*
            address: "309 EDGEWOOD AVE "
            city: "Atlanta"
            id: 1
            inventory: Object { Jeans: {…}, "Phillies hat": {…}, "pink sweater": {…}, … }
            latitude: 33.75416
            longitude: -84.37742
            name: "AFD Station 4"
            phoneNumber: "(404) 555 - 3456"
            state: "GA"
            type: "Drop Off"
            web: "www.afd04.atl.ga"
            zip: 30332
         */

        return(
            <Paper className={classes.infoDialog}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>{info.name}</Typography>
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
                    <Typography variant="h6" color="inherit">Address: { info.address + ", " + info.city + ", " + info.state + " " + info.zip }</Typography>
                    <Typography variant="h6" color="inherit">Website: { info.web }</Typography>
                    <Typography variant="h6" color="inherit">Phone: { info.phoneNumber }</Typography>
                    <Typography variant="h6" color="inherit">Location Type: { info.type }</Typography>

                    {(info.inventory != null) &&
                        <Paper className={classes.itemListPaper}>
                            <List className={classes.itemList} disablePadding>
                                {inventory.map((item, index) =>
                                    <ItemElement info={item} key={"itemElement" + index} />
                                )}
                            </List>
                        </Paper>
                    }

                    {(accountType && accountType === "Location Employee") &&
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.addButton}
                            onClick={this.handleOpenNI}
                        >Add Item to Inventory</Button>
                    }

                    <NewItemDialog location={info} open={newOpen} handleClose={this.handleCloseNI} handleSubmit={this.handleSubmitNI} />
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(LocationInfo);
