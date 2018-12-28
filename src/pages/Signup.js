import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import app from '../firebase';


const styles = theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    paper: {
        width: 500,
        maxWidth: '80%',
        padding: 3 * theme.spacing.unit
    },
    button: {
        float: 'right'
    },
    link: {
        textDecoration: 'none'
    }
});

class SignupPage extends React.Component {
    handleSignUp = async (event) => {
        event.preventDefault();

        const { email, password, passwordConf } = event.target.elements;

        if (password.value !== passwordConf.value) {
            alert('Password and password confirmation must match!');
        } else {
            try {
                await app.auth().createUserWithEmailAndPassword(email.value, password.value);
                this.props.history.push('/');
            } catch (error) {
                alert(error);
            }
        }
    };

    render() {
        const { classes } = this.props;

        return(
            <div className={classes.container}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' gutterBottom>Sign Up</Typography>

                    <form onSubmit={this.handleSignUp}>
                        <TextField
                            id='email'
                            label='Email'
                            type='email'
                            margin='normal'
                            fullWidth
                        />

                        <TextField
                            id='password'
                            label='Password'
                            type='password'
                            margin='normal'
                            fullWidth
                        />

                        <TextField
                            id='passwordConf'
                            label='Confirm Password'
                            type='password'
                            margin='normal'
                            fullWidth
                        />

                        <Button variant='contained' color='primary' type='submit' className={classes.button}>Login</Button>
                    </form>

                    <Link
                        to='/login'
                        className={classes.link}
                    >
                        <Typography variant='h6' gutterBottom>Already have an account? Login!</Typography>
                    </Link>
                </Paper>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(SignupPage));
