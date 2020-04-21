import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./login";
import history from "./navigation/history";
import PrivateRoute from "./navigation/private-route";
import NotFound from "./not-found";

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute component={NotFound} />
      </Switch>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
