import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {Card, Button, Form} from "react-bootstrap"
import "../Style/OtherCards.css"

const OtherCards = () => {
    return(           
        <Card border="secondary" style={{ height:"400px", marginTop:"10px", width: '350px' }}>
        <Card.Body>
            <Card.Title className = "title">Localiza</Card.Title>
            <Card.Text>
            <form>
            <div className= "selects">
                <div className = "row-selects">
                    <div className ="select1">
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control as="select">
                            <option>Selecione</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className = "select2">
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Ano</Form.Label>
                            <Form.Control as="select">
                            <option>2015</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                </div>
                <div>
                    <div className ="select3">
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Versão</Form.Label>
                            <Form.Control as="select">
                            <option>Selecione</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                </div>
                <div className="buttons">
                    <Button className="button" variant="outline-secondary">Anúncio</Button>{' '}
                    <Button variant="outline-primary">Enviar</Button>{' '}
                </div>  
            </div>
            </form>
        </Card.Text>
        </Card.Body>
        </Card>
    
    )

}


export default OtherCards;