import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
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

class LoginPage extends React.Component {
    handleSignIn = async (event) => {
        event.preventDefault();

        const { email, password } = event.target.elements;

        try {
            await app.auth().signInWithEmailAndPassword(email.value, password.value);
            this.props.history.push('/');
        } catch (error) {
            alert(error);
        }
    };

    render() {
        const { classes } = this.props;

        return(
            <div className={classes.container}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' gutterBottom>Login</Typography>

                    <form onSubmit={this.handleSignIn}>
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

                        <Button variant='contained' color='primary' type='submit' className={classes.button}>Login</Button>
                    </form>

                    <Link
                        to='/signup'
                        className={classes.link}
                    >
                        <Typography variant='h6' gutterBottom>Need an account? Sign up!</Typography>
                    </Link>
                </Paper>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(LoginPage));
