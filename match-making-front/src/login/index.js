import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import GoogleButton from "react-google-button";
import { Card, Container, Row } from "react-bootstrap";
import { authenticate, errorLogin, errorMessage } from "./auth";
import "./background.css";
import "./styles.css";
import { useHistory } from "react-router-dom";

function Login() {
  let history = useHistory();

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

        <div className="boxGoogle">
          <Row className="justify-content-center">
            <Card style={{ width: "23m", height: "23m" }}>
              <Card.Header>
                <h3>Acesso à plataforma</h3>
              </Card.Header>
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">
                  Autenticar usando sua conta :
                </Card.Subtitle>
                <Card.Text className="button">
                  <GoogleButton
                    onClick={() => {
                      authenticate(() => {
                        history.push("/home");
                      });
                    }}
                  />
                </Card.Text>
                <Card.Footer className="msgErr" hidden={errorLogin}>
                  <p>{errorMessage}</p>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Login;
