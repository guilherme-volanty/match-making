import React from 'react';
import './App.css';
import Card from './components/card/index';
import Table from './components/table/index';
import Header from './components/header/index.js';

function App() {
  return (
    <div className="App">
       <Header />
       <Card/>
    </div>
  );
}

export default App;
