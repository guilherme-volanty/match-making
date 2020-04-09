import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleButton from 'react-google-button'
import {Card, Container, Row} from "react-bootstrap";
import * as firebase from "firebase";


function App() {
    //Função de autenticação chamada no onclick do botão de login
    function authenticate() {

        // Usando um pop-up
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // Isso fornece um token do Google Access
            var token = result.credential.accessToken;
            // As informações do usuário conectado.
            var user = result.user;
        });
    }

    return (
    //    HTML do Card d Login
    <Container>
        <Row className="justify-content-md-center">
      <Card style={{ width: '18rem' }}>
          <Card.Header>Car Match</Card.Header>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">Login com google</Card.Subtitle>
          <Card.Text>
            <GoogleButton onClick={() => { authenticate()}}/>
          </Card.Text>
        </Card.Body>
      </Card>
        </Row>

    </Container>
    );

  }
 

export default App;
