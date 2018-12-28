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

class LocationElement extends React.Component {
    onClickEvent = () => {
        const { onClick, info } = this.props;

        onClick(info);
    };

    render() {
        const { classes, info } = this.props;

        const fullAddress = `${formatters.capitalizeWords(info.address)}, ${formatters.capitalizeWords(info.city)}, ${info.state.toUpperCase()} ${info.zip}`;

        return(
            <div className={classes.container} onClick={this.onClickEvent}>
                <Typography variant='h6'>{ info.name.toUpperCase() }</Typography>
                <Typography variant='body1' gutterBottom>{ fullAddress }</Typography>
            </div>
        );
    }
}

LocationElement.propTypes = {
    onClick: PropTypes.func.isRequired,
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
    }).isRequired
};

export default withStyles(styles)(LocationElement);
