import React from "react";
import { withRouter, Link } from "react-router-dom";
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import app from "../firebase";


const styles = theme => ({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
    paper: {
        width: 500,
        maxWidth: "80%",
        padding: 3 * theme.spacing.unit
    },
    button: {
        float: "right"
    }
});

class LoginPage extends React.Component {
    handleSignIn = async (event) => {
        event.preventDefault();

        const { email, password } = event.target.elements;

        try {
            await app
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
            this.props.history.push("/");
        } catch (error) {
            alert(error);
        }
    };

    render() {
        const { classes } = this.props;

        return(
            <div className={classes.container}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" gutterBottom>Login</Typography>

                    <form onSubmit={this.handleSignIn}>
                        <TextField
                            id="email"
                            label="Email"
                            type="email"
                            margin="normal"
                            fullWidth
                        />

                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            margin="normal"
                            fullWidth
                        />

                        <Button variant="contained" color="primary" type="submit" className={classes.button}>Login</Button>
                    </form>

                    <Link to="/signup">
                        <Typography variant="h6" gutterBottom>Need an account? Sign up!</Typography>
                    </Link>
                </Paper>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(LoginPage));
