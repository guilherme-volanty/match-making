import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./login";
import MatchScreen from './match-screen/Components/match-screen/MatchScreen';
import Table from './match-screen/Components/Crud/Crud';
import { history } from "./navigation/history";
import PrivateRoute from "./navigation/private-route";
import NotFound from "./not-found";

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/match" component={MatchScreen} />
        <Route path="/table" component={Table} />
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
