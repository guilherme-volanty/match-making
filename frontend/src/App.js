import React from 'react';
import './App.css';
import Routes from './routes/routes';
import Table from './components/table/index';
import Filtertable from './components/table2'

function App(props) {
  return (
    <div className="App">
       <Filtertable/>
       
    </div>
  );
}

export default App;
