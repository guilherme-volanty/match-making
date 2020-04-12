import React from "react";
import {Route, Redirect} from "react-router";
import {isAuthenticated} from './Auth';

const PrivateRoute = props => {
    return isAuthenticated(props) ? <Route {...props}/> : <Redirect to={"/Login"}/>
};

export default PrivateRoute;