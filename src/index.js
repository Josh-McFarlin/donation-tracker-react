import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import PrivateRoute from './components/PrivateRoute';
import app from './firebase';

import Home from './pages/Home';
import LogIn from './pages/Login';
import SignUp from './pages/Signup';

import './index.css';
import * as serviceWorker from './serviceWorker';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            authenticated: false,
            user: null
        };
    }

    componentDidMount() {
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    currentUser: user,
                    loading: false
                });
            } else {
                this.setState({
                    authenticated: false,
                    currentUser: null,
                    loading: false
                });
            }
        });
    }

    render() {
        const { authenticated, loading } = this.state;

        if (loading) return <p>Loading...</p>;

        return (
            <Router>
                <React.Fragment>
                    <CssBaseline />
                    <PrivateRoute
                        exact
                        path='/'
                        component={Home}
                        authenticated={authenticated}
                    />
                    <Route exact path='/login' component={LogIn} />
                    <Route exact path='/signup' component={SignUp} />
                </React.Fragment>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
