import React from 'react';
import './App.css';
import Header from './components/menu/index';
import Background from './components/background/index';
import UploadCard from './components/cardUpload/index';
import SearchCard from './components/cardSearch/index';
import Routes from './routes/routes';

function App() {
  

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
