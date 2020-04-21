import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import GoogleButton from "react-google-button";
import { Card, Container, Row } from "react-bootstrap";
import { authenticate, errorLogin, errorMessage } from "../../Auth";
import "./background.css";

class Login extends Component {
  render() {
    return (
      <>
        <div className="wrap">
          <img
            className="car"
            src="https://assets.volanty.com/images/3.0/volanty-car2.png"
            alt="carro"
          />
          <img
            className="logo"
            src="https://assets.volanty.com/images/3.0/nova-logo.svg"
            alt="logo"
          />

          <Container className="boxGoogle">
            <Row className="justify-content-md-center">
              <Card style={{ width: "23m", height: "23m" }}>
                <Card.Header>
                  <h3>Acesso à plataforma</h3>
                </Card.Header>
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">
                    Autenticar usando sua conta :
                  </Card.Subtitle>
                  <Card.Text class="button">
                    <GoogleButton
                      onClick={() => {
                        authenticate();
                      }}
                    />
                  </Card.Text>
                  <Card.Footer class="msgErr" hidden={errorLogin}>
                    <p>{errorMessage}</p>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Login;
