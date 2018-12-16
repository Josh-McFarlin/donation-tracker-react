import React from "react";
import {  Typography, Paper, withStyles, List, AppBar, Toolbar, Button, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import Map from "../components/Map";
import LocationElement from "../components/LocationElement";
import LocationInfo from "../components/LocationInfo";
import SearchInfo from "../components/SearchInfo";

import firebase from "../firebase";


const styles = theme => ({
    floating: {
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 2 * theme.spacing.unit,
        zIndex: 1000,
        pointerEvents: "none",
        overflow: "hidden"
    },
    title: {
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        padding: theme.spacing.unit
    },
    lowerInfo: {
        width: "100%",
        height: "100%",
        marginTop: 2 * theme.spacing.unit,
        display: "flex"
    },
    listPaper: {
        width: "30%",
        height: "100%",
        marginRight: 4 * theme.spacing.unit
    },
    list: {
        width: "100%",
        height: "100%",
        pointerEvents: "all",
        overflowY: "auto"
    },
    loading: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    mapContainer: {
        width: "100%",
        height: "100%"
    },
    map: {
        width: "100%",
        height: "100%"
    },
    grow: {
        flexGrow: 1
    },
    signout: {
        pointerEvents: "all"
    },
    search: {
        display: "flex",
        alignItems: "center",
        pointerEvents: "all",
        borderRadius: theme.shape.borderRadius,
        marginRight: 2 * theme.spacing.unit,
        marginLeft: 0,
        '&:hover': {
            background: "rgba(20, 20, 20, 0.5)",
        }
    },
    searchIcon: {
        width: 8 * theme.spacing.unit,
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    }
});

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            places: [],
            showInfo: false,
            showSearch: false,
            searchText: "",
            searchTerm: "",
            selected: 0
        };
    }

    componentDidMount() {
        firebase.database().ref('/locations/').once('value').then(function(snapshot) {
            const vals = snapshot.val();

            this.setState({
                places: vals
            });
        }.bind(this));
    }

    onMarkerClick = (info) => {
        this.setState({
            showInfo: true,
            selected: info
        });
    };

    closeInfo = () => {
        this.setState({
            showInfo: false
        });
    };

    setSearch = (event) => {
        this.setState({
            searchText: event.target.value
        });
    };

    searchSubmit = (event) => {
        if (event.key === 'Enter') {
            const newSearch = event.target.value;

            if (this.state.searchTerm !== newSearch) {
                this.setState({
                    searchTerm: newSearch,
                    showSearch: true
                });
            }
        }
    };

    closeSearch = () => {
        this.setState({
            showSearch: false
        });
    };

    render() {
        const { classes } = this.props;
        const { places, selected, showInfo, showSearch, searchText, searchTerm } = this.state;

        /*
        {showSearch &&
            <SearchInfo searchTerm={searchTerm} closeInfo={this.closeSearch} />
        }

        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search Inventory"
                classes={{
                    root: classes.inputRoot
                }}
                value={searchText}
                onChange={this.setSearch}
                onKeyDown={this.searchSubmit}
            />
        </div>
         */

        return (
            <React.Fragment>
                <div className={classes.floating}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" color="inherit" className={classes.grow}>Donation Tracker</Typography>

                            <Button
                                variant="contained"
                                color="default"
                                className={classes.signout}
                                onClick={() => firebase.auth().signOut()}
                            >Logout</Button>
                        </Toolbar>
                    </AppBar>

                    <div className={classes.lowerInfo}>
                        <Paper className={classes.listPaper}>
                            <AppBar position="static">
                                <Toolbar>
                                    <Typography variant="h6" color="inherit" className={classes.grow}>Donation Centers</Typography>
                                </Toolbar>
                            </AppBar>

                            <List className={classes.list} disablePadding>
                                {
                                    Object.values(places).map((item, index) =>
                                        <LocationElement
                                            key={"item" + index}
                                            onClick={this.onMarkerClick}
                                            info={item}
                                        />
                                    )
                                }
                            </List>
                        </Paper>

                        {showInfo &&
                            <LocationInfo info={selected} closeInfo={this.closeInfo} />
                        }
                    </div>
                </div>

                <Map
                    markers={Object.values(places)}
                    onMarkerClick={this.onMarkerClick}
                    isMarkerShown
                    googleMapURL={"https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_MAPS_KEY + "&v=3.exp&libraries=geometry,drawing,places"}
                    loadingElement={<div className={classes.loading}><h3>Your map is now loading</h3></div>}
                    containerElement={<div className={classes.mapContainer} />}
                    mapElement={<div className={classes.map} />}
                    defaultOptions={{
                        streetViewControl: false,
                        scaleControl: false,
                        mapTypeControl: false,
                        panControl: true,
                        zoomControl: false,
                        rotateControl: false,
                        fullscreenControl: false
                    }}
                />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Home);
