import React from "react";
import {Route, Redirect} from "react-router";
import {isAuthenticated} from './Auth';

const PrivateRoute = props => {
    return isAuthenticated() ? <Route {...props}/> : <Redirect to={"/"}/>
};

export default PrivateRoute;