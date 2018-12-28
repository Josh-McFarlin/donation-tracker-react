import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


function PrivateRoute({
     component: Component,
     authenticated,
     ...rest
 }) {
    return (
        <Route
            {...rest}
            render={
                props => (
                    authenticated === true ? (
                        <Component {...props} {...rest} />
                    ) : (
                        <Redirect to='/login'/>
                    )
                )
            }
        />
    );
}

PrivateRoute.propTypes = {
    component: PropTypes.element.isRequired,
    authenticated: PropTypes.bool.isRequired
};

export default PrivateRoute;
