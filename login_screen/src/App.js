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
    <Container className="boxgoogle">
        <Row className="justify-content-md-center">
      <Card style={{ width: '35rem' ,height: '35rem' }}>
          <Card.Header><h1 className = "titulo1" >Acesso à plataforma</h1></Card.Header>
        <Card.Body>
          <Card.Subtitle className="titulo2"/*</Card.Body>className="mb-2 text-muted"*/><h2>Autenticar, usando sua conta em:</h2></Card.Subtitle>
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
