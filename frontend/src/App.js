import React from 'react';
import './App.css';
import Routes from './routes/routes';
import Filtertable from './components/table'
import Card from './components/cardUpload'

function App(props) {
  return (
    <div className="App">
       <Filtertable/>
       
    </div>
  );
}

export default App;
