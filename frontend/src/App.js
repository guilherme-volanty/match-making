import React from 'react';
import './App.css';
import Card from './components/card/index';
import Table from './components/table/index';
import Header from './components/header/index.js';
import Filter from './components/filter/index.js';

function App(props) {
  return (
    <div className="App">
       <Header />
       <Filter/>
    </div>
  );
}

export default App;
