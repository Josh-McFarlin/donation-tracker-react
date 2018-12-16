import React from "react";
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: theme.spacing.unit,
        cursor: "pointer",
        "&:hover": {
            background: "#e0e0e0"
        }
    }
});

class LocationElement extends React.Component {
    onClickEvent = () => {
        const { onClick, info } = this.props;

        onClick(info);
    };

    render() {
        const { classes, info } = this.props;

        return(
            <div className={classes.container} onClick={this.onClickEvent}>
                <Typography variant="h6">{ info.name }</Typography>
                <Typography variant="body1" gutterBottom>{ info.address + ", " + info.city + ", " +  info.state + " " + info.zip }</Typography>
            </div>
        );
    }
}

export default withStyles(styles)(LocationElement);
