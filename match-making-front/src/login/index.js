import React from "react";
import "./styles.css";
import GoogleButton from "react-google-button";
import { Card, Container, Row } from "react-bootstrap";
import { authenticate } from "./auth";

function App() {
  return (
    //    HTML do Card d Login
    <Container className="boxgoogle">
      <Row className="justify-content-md-center">
        <Card style={{ width: "23m", height: "23m" }}>
          <Card.Header> Acesso à plataforma</Card.Header>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">Car Match</Card.Subtitle>
            <Card.Text>
              <GoogleButton
                onClick={() => {
                  authenticate();
                }}
              />
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default App;
