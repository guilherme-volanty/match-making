import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import * as firebase from "firebase";
import * as serviceWorker from './serviceWorker';

//Import da configuração do firebase
import firebaseConfig from "./firebase.config";

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
  document.getElementById('root')
);



serviceWorker.unregister();
