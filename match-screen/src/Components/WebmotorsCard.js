import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Card from "react-bootstrap/Card";
import "../Style/WebmotorsCard.css";
import axios from 'axios';



const WebmotorsCard = () => {
    const [car, setCar] = useState({})
    const url = "https://5e8e241022d8cd0016a79f79.mockapi.io/matchTop/v1/Webmotors/1"

    useEffect(() => {
        axios.get(url)
        .then( res => {
            setCar(res.data)
        })
    }, []);





    return(
        <Card border="secondary" style={{ height:"400px", marginTop:"10px", width: '350px' }}>
        <Card.Body>
            <Card.Title className = "title">Webmotors</Card.Title>
            <Card.Text>
            <div className= "attributes">
                <div className = "row-attributes">
                    <div className ="attribute1">
                        <p>Marca</p>
                        <span> {car.brand}</span>
                    </div>
                    <div className = "attribute2">
                        <p> Modelo </p>
                        <span> {car.model}</span>
                    </div>
                </div>
                <div className = "row-attributes">
                    <div className ="attribute3">
                        <p> Ano </p>
                        <span> {car.modelYear}</span>
                    </div>
                    <div className = "attribute4">
                        <p> Carroceria </p>
                        <span> {car.carroceria}</span>
                    </div>
                </div>
                <div className = "attribute5">
                        <p> Versão </p>
                        <span> {car.version} </span>
                </div>
            </div>
        </Card.Text>
        </Card.Body>
        </Card>
        
    )

}


export default WebmotorsCard; 