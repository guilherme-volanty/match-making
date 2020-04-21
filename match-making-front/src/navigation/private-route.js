import React from "react";
import { Route, Redirect } from "react-router";
import { isAuthenticated } from "../login/auth";

const PrivateRoute = (props) => {
  return isAuthenticated() ? <Route {...props} /> : <Redirect to={"/Login"} />;
};

export default PrivateRoute;
