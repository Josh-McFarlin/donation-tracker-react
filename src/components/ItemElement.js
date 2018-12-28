import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { formatters } from '../helpers';


const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: theme.spacing.unit,
        cursor: 'pointer',
        '&:hover': {
            background: '#e0e0e0'
        }
    }
});

class ItemElement extends React.Component {
    render() {
        const { classes, clickHandler, info, showLocation } = this.props;

        const nameAndPrice = formatters.capitalizeWords(info.shortDescription) + ' - $' + formatters.price(info.value);

        return(
            <div className={classes.container} onClick={clickHandler}>
                <Typography variant='h6'>{ nameAndPrice }</Typography>

                {(showLocation) &&
                    <Typography variant='body1'>Donation Center: { info.location.toUpperCase() }</Typography>
                }

                <Typography variant='body1'>Category: { info.category }</Typography>
                <Typography variant='body1'>Description: { formatters.capitalize(info.fullDescription) }</Typography>
            </div>
        );
    }
}

ItemElement.propTypes = {
    clickHandler: PropTypes.func,
    info: PropTypes.shape({
        category: PropTypes.string,          // 'Clothing'
        fullDescription: PropTypes.string,   // 'light blue skinny jeans'
        location: PropTypes.string,          // 'AFD Station 4'
        shortDescription: PropTypes.string,  // 'Jeans'
        timeStamp: PropTypes.string,         // '2018-11-15 13:29:34'
        value: PropTypes.oneOfType([         // 70
            PropTypes.string,
            PropTypes.number
        ])
    }).isRequired,
    showLocation: PropTypes.func
};

export default withStyles(styles)(ItemElement);
