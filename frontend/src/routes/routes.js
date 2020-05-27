import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    
  } from "react-router-dom";
import UploadPage from '../pages/UploadPage';



const Routtes = () => {
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

export default Routtes;