import React from 'react';
import MatchScreen from './Components/MatchScreen'
import Crud from './Components/Crud'
import "./Style/background.css"
import {
  BrowserRouter as Router, 
  Switch,
  Route
} from 'react-router-dom'
import Header from './Components/header'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route className = "match-screen"path = "/match-screen" component= {MatchScreen}></Route>
          <Route path = "/match-table" component = {Crud}></Route>
        </Switch>
        </div>
    </Router>
  );
}

export default App;
