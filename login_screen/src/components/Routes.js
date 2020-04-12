import React from "react";

import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import NotFound from './NotFound';
import {Router,Switch,Route} from "react-router";
import PrivateRoute from '../PrivateRoutes'
import {history} from "../history";


const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={Login}/>
            <PrivateRoute path="/home" component={Home}/>
            <PrivateRoute exact path="/" component={NotFound}/>
        </Switch>
    </Router>
);


export default Routes