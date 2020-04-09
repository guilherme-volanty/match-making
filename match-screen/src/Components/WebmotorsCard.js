import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "../Style/WebmotorsCard.css";
import axios from 'axios';



const WebmotorsCard = () => {
    const [car, setCar] = useState({})
    const url = `https://5e8e241022d8cd0016a79f79.mockapi.io/matchTop/v1/Webmotors/${((Math.random() * 10) + 1).toFixed(0)}`

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setCar(res.data)
            })
    }, []);

    return (
        <div className="card border-secondary mb-3" style={{height: "400px", marginTop: "10px", width: '350px'}}>
            <div className="card-body text-dark">
                <h5 className="card-title title ">Webmotors</h5>
                <div className ="card-text ">
                    <div className="attributes">
                        <div className="row-attributes">
                            <div className="attribute1">
                                <span className="attributeName">Marca</span>
                                <span> {car.brand}</span>
                            </div>
                            <div className="attribute2">
                                <span className="attributeName"> Modelo </span>
                                <span> {car.model}</span>
                            </div>
                        </div>
                        <div className="row-attributes">
                            <div className="attribute3">
                                <span className="attributeName"> Ano </span>
                                <span> {car.modelYear}</span>
                            </div>
                            <div className="attribute4">
                                <span className="attributeName"> Carroceria </span>
                                <span> {car.carroceria}</span>
                            </div>
                        </div>
                        <div className="attribute5">
                            <span className="attributeName"> Versão </span>
                            <span> {car.version} </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default WebmotorsCard; 