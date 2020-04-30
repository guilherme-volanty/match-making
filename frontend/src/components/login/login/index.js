import React, { Component} from "react";
import GoogleButton from "react-google-button";
import {Card, Row} from "react-bootstrap";
import { errorLogin, errorMessage, loginMatch} from "../../../services/auth";
import "./styles.css";
import { Redirect } from "react-router-dom";



class Login extends Component {

    state = { redirect: null };
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <>
                <div className="wrap-login">
                    <div className="boxGoogle">
                        <Row className="justify-content-center">
                            <Card className="card-login" style={{width: "23m", height: "23m"}}>
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
                                                loginMatch(() => {
                                                    this.setState({redirect: "/match-screen"});
                                                })
                                            }}
                                        />
                                    </Card.Text>
                                    <Card.Footer className="msgErr" hidden={!errorLogin}>
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
}



export default Login;
