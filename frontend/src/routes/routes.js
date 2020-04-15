import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import SearchPage from '../pages/SearchPage';
import UploadPage from '../pages/UploadPage';



const Routess = () => {
   return(
    <Router>
        <Switch>
            {/* <Route exact path="/" component={BlankHome}/> */}
            <Route path="/upload-database" component={UploadPage}/>
            {/* <Route path="/search-database" component={SearchPage}/> */}
        </Switch>
    </Router>
   )
};

export default Routess;