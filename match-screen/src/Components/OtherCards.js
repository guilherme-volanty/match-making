import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import "../Style/OtherCards.css"
import Ilustration from '../assets/undraw_towing_6yy4.png'

const OtherCards = (props) => {

    const onChangeVersion = (event) => {
        if(props.origin ==="Localiza"){
            props.setLocalizaId(event.target.value)
            props.setLocalizaAccepted(true)

        }else {
            props.setMovidaId(event.target.value)
            props.setMovidaAccepted(true)

        }
    }

    const checkHasCar = () =>{
        const regex = new RegExp(props.webmotorsData.model)
        var filter = props.data.filter(filter =>filter.year === props.webmotorsData.modelYear &&
            filter.name.match(regex))
        return filter
    }

    return (
        <div>
            {checkHasCar().length >0 ?        
            <div className="card mb-3" style={{height: "400px", marginTop: "10px", width: '350px'}}>
                <div className="card-body text-dark">
                    <h5 className="card-title title">{props.origin}</h5>
                    <div className="card-text">
                        <div className="selects">
                            <div className="row-selects">
                                <div className="select1 form-group">
                                    <label htmlFor="nome">Nome</label><br/>
                                    {checkHasCar().length>0
                                    ? <span>{props.webmotorsData.brand} {props.webmotorsData.model} </span>
                                        :<span></span>}
                                </div>
                                <div className="select2 form-group">
                                    <label htmlFor="nome">Ano</label><br />
                                    {checkHasCar().length>0
                                            ? <span>{props.webmotorsData.modelYear} </span>
                                                :<span></span>}
                                </div>
                            </div>
                            <div>
                                <div className="select3 form-group">
                                    <label htmlFor="nome">Versão</label>
                                    <select className="form-control" placeholder="Selecione" onChange={onChangeVersion}>
                                        <option disabled selected>Selecione</option>
                                        <option value = "">Não há Match</option>
                                        {checkHasCar()
                                            .map(car => <option value= {car.id} key ={car.id}>{car.version}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
            : <div className="card mb-3" style={{height: "400px", marginTop: "10px", width: '350px'}}>
                    <div className="card-body text-dark">
                        <div className="noMatch">
                            <h5 className="card-title title">{props.origin}</h5>
                            <img src={Ilustration} alt="ilustração" width="100%" height="50%"></img>
                            <p>Que pena que não há match! Infelizmente a {props.origin} não possui nenhum {props.webmotorsData.model}/{props.webmotorsData.modelYear} </p>
                        </ div>
                    </div>
                </div>
            }
    </div>
    )

}


export default OtherCards;