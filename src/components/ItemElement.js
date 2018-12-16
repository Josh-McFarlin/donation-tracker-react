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

class ItemElement extends React.Component {
    render() {
        const { classes, onClick, info, showLocation } = this.props;

        /*
            category: "Clothing"
            fullDescription: "light blue skinny jeans"
            location: "AFD Station 4"
            shortDescription: "Jeans"
            timeStamp: "2018-11-15 13:29:34"
            value: 70
         */

        return(
            <div className={classes.container} onClick={onClick}>
                <Typography variant="h6">{ info.shortDescription + " - $" + info.value }</Typography>
                {(showLocation) &&
                    <Typography variant="body1">Donation Center: { info.location }</Typography>
                }
                <Typography variant="body1">Category: { info.category }</Typography>
                <Typography variant="body1">Description: { info.fullDescription }</Typography>
            </div>
        );
    }
}

export default withStyles(styles)(ItemElement);
