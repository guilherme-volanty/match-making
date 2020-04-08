import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Card from "react-bootstrap/Card"
import "../Style/WebmotorsCard.css"



const WebmotorsCard = () => {

    return(
        <Card border="secondary" style={{ height:"400px", marginTop:"10px", width: '350px' }}>
        <Card.Body>
            <Card.Title className = "title">Webmotors</Card.Title>
            <Card.Text>
            <div className= "attributes">
                <div className = "row-attributes">
                    <div className ="attribute1">
                        <p> Marca </p>
                        <span> Ford</span>
                    </div>
                    <div className = "attribute2">
                        <p> Modelo </p>
                        <span> Fiesta</span>
                    </div>
                </div>
                <div className = "row-attributes">
                    <div className ="attribute3">
                        <p> Ano </p>
                        <span> 2017</span>
                    </div>
                    <div className = "attribute4">
                        <p> Carroceria </p>
                        <span> Sedã</span>
                    </div>
                </div>
                <div className = "attribute5">
                        <p> Versão </p>
                        <span> Todas informações </span>
                </div>
            </div>
        </Card.Text>
        </Card.Body>
        </Card>
        
    )

}


export default WebmotorsCard; 