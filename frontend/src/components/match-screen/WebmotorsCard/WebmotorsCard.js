import React from 'react';
import "./WebmotorsCard.css";

const WebmotorsCard = (props) => {
    console.log(props.data)    
    return (
        <div className="card mb-3-match-screen" >
            <div className="card-body text-dark">
                <h5 className="card-title title ">Webmotors</h5>
                <div className ="card-text ">
                    {props.data._id?
                    <div className="attributes">
                        <div className="row-attributes">
                            <div className="attribute1">
                                <span className="attributeName">Marca</span>
                                <span> {props.data.brand}</span>
                            </div>
                            <div className="attribute2">
                                <span className="attributeName"> Modelo </span>
                                <span> {props.data.model}</span>
                            </div>
                        </div>
                        <div className="row-attributes">
                            <div className="attribute3">
                                <span className="attributeName"> Ano </span>
                                <span> {props.data.modelYear}</span>
                            </div>
                            <div className="attribute4">
                                <span className="attributeName"> Carroceria </span>
                                <span> {props.data.bodyWork}</span>
                            </div>
                        </div>
                        <div className="attribute5">
                            <span className="attributeName"> Versão </span>
                            <span> {props.data.version} </span>
                        </div>
                    </div>:<h2>CARREGANDO...</h2>}
                </div>
            </div>
        </div>
    )


}


export default WebmotorsCard; 
