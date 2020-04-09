import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleButton from 'react-google-button'
import {Card, Container, Row} from "react-bootstrap";


function App() {
    function authenticate() {
    }


    return (
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
