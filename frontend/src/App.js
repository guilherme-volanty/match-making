import React from 'react';
import './App.css';
import Header from './components/header/index';
import Background from './components/background/index';
import UploadCard from './components/cardUpload/index';
import SearchCard from './components/cardSearch/index';

function App() {
  

  return (
    <div className="App">
      <Header />
      <Background />
      <UploadCard />
    </div>
  );
}

export default App;
