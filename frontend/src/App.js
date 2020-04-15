import React from 'react';
import './App.css';
import Card from './components/card/index';
import Table from './components/table/index';
import Header from './components/header/index';
import Filter from './components/filter/index';
import Modall from './components/modal';
import TESTE from './components/teste';
import Background from './components/background/index'

function App(props) {
  return (
    <div className="App">
       <Background/>
       <Card/>
       
    </div>
  );
}

export default App;
