import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleButton from 'react-google-button'
import {Card, Container, Row} from "react-bootstrap";


function App() {
    //Função de autenticação chamada no onclick do botão de login
    function authenticate() {
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
