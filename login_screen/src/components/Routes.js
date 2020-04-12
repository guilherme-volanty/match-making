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
            <Route exact path="/login" component={Login}/>
            <PrivateRoute exact path="/home" component={Home}/>
            <PrivateRoute component={NotFound}/>
        </Switch>
    </Router>
);


export default Routes