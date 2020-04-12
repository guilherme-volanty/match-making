import React from 'react';
import './App.css';
import Header from './components/header/index';
import Background from './components/background/index';
import Card from './components/card/index';

function App() {
  return (
    <div className="App">
      <Header />
      <Background />
      <Card />
    </div>
  );
}

export default App;
