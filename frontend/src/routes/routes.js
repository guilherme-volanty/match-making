import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import PrivateRoute from "./navigation/private-route";
import Login from '../pages/Login';
import SearchBasePage from '../pages/SearchBasePage';
import UploadBasePage from '../pages/UploadBasePage';
import SearchMatchPage from '../pages/SearchMatchPage';
import UploadMatchPage from '../pages/UploadMatchPage';
import Match from '../pages/Match';
import MatchTable from '../pages/MatchTable';
import NotFound from "../pages/NotFound";

const Routes = () => {
   return(
    <Router>
        <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/" component={Login}/>
            <PrivateRoute path="/upload-database" component={UploadBasePage}/>
            <PrivateRoute path="/search-database" component={SearchBasePage}/>
            <PrivateRoute path="/upload-match" component={UploadMatchPage}/>
            <PrivateRoute path="/search-match" component={SearchMatchPage}/>
            <PrivateRoute exact path="/match-screen" component={Match}/>
            <PrivateRoute path="/match-table" component={MatchTable}/>
            <Route component={NotFound} />
        </Switch>
    </Router>
   )
};

export default Routes;

