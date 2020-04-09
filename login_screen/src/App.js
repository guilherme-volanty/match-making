import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import GoogleButton from 'react-google-button'


function App() {
  return (
    <GoogleButton onClick={() => { console.log('Google button clicked')}}/>
  );

  }
 

export default App;
