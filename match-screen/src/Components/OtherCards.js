import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Card, Button, Form } from "react-bootstrap"
import "../Style/OtherCards.css"
import axios from 'axios'

const OtherCards = (props) => {

    const url = `https://5e8e241022d8cd0016a79f79.mockapi.io/matchTop/v1/${props.origin}`
    const [cars, setCars] = useState([])
    const [origin, setOrigin] = useState("")
    const [form,setForm] = useState({name:"", year:"", version:""})
    const [isfilled, setIsFilled] = useState(false)

    useEffect(() => {
        axios.get(url)
        .then(res => {
            setCars(res.data)
            setOrigin(res.data[0].origin)
        });
    },[url])

    const onChangeSelect = field => event => {
        setForm({
            ...form,
            [field]: (event.target.value)
        });
    }

    console.log(form)



    return (
        <Card border="secondary" style={{ height: "400px", marginTop: "10px", width: '350px' }}>
            <Card.Body>
                <Card.Title className="title">{origin}</Card.Title>
                <Card.Text>
                    <div className="selects">
                        <div className="row-selects">
                            <div className="select1 form-group">
                                <label htmlFor="nome">Nome</label>
                                <select className="form-control" onChange={onChangeSelect("name")}>
                                        <option value = "">Selecione</option>
                                        {cars.map(car => <option value= {car.name} key ={car.id}> {car.name}</option>)}
                                </select>
                            </div>
                            <div className="select2 form-group">
                                <label htmlFor="nome">Ano</label>
                                <select className="form-control" onChange={onChangeSelect("year")}>
                                    <option value = "">-</option>
                                    {cars.map(car => <option value= {car.year} key ={car.id}> {car.year}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <div className="select3 form-group">
                                <label htmlFor="nome">Nome</label>
                                <select className="form-control" onChange={onChangeSelect("version")}>
                                    <option value = "">Selecione</option>
                                    {cars.map(car => <option value= {car.version}key ={car.id}> {car.version}</option>)}
                                </select>
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