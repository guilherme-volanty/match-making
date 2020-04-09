import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Card, Button, Form } from "react-bootstrap"
import "../Style/OtherCards.css"
import axios from 'axios'

const OtherCards = (props) => {

    const url = `https://5e8e241022d8cd0016a79f79.mockapi.io/matchTop/v1/${props.origin}`
    const [cars, setCars] = useState([])
    const [origin, setOrigin] = useState("")
    const [form,setForm] = useState({})
    const [isfilled, setIsFilled] = useState(false)

    useEffect(() => {
        axios.get(url)
        .then(res => {
            setCars(res.data)
            setOrigin(res.data[0].origin)
        });
    },[url])




    return (
        <Card border="secondary" style={{ height: "400px", marginTop: "10px", width: '350px' }}>
            <Card.Body>
                <Card.Title className="title">{origin}</Card.Title>
                <Card.Text>
                    <div className="selects">
                        <div className="row-selects">
                            <div className="select1">
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control as="select">
                                        <option value = "">Selecione</option>
                                        {cars.map(car => <option value= {car.name} key ={car.id}> {car.name}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="select2">
                                <Form.Group controlId="exampleForm.ControlSelect1" >
                                    <Form.Label>Ano</Form.Label>
                                    <Form.Control as="select" onChange={console.log(5)}>
                                    <option value = "">-</option>
                                    {cars.map(car => <option value= {car.year} key ={car.id}> {car.year}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                        <div>
                            <div className="select3">
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Versão</Form.Label>
                                    <Form.Control as="select">
                                    <option value = "">Selecione</option>
                                    {cars.map(car => <option value= {car.version}key ={car.id}> {car.version}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="buttons">
                            <Button className="button" variant="outline-secondary">Anúncio</Button>{' '}
                            <Button variant="outline-primary">Enviar</Button>{' '}
                        </div>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    )

}


export default OtherCards;