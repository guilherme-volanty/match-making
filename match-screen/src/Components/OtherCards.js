import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import "../Style/OtherCards.css"
import Ilustration from '../assets/undraw_towing_6yy4.png'

const OtherCards = (props) => {

    const [name, setName] = useState("")
    const [year, setYear] = useState(0)
    const [version, setVersion] = useState("")
    const [matchFalse,setMatchFalse] = useState(false)

    const onChangeName = (event) => {
        setName(event.target.value)

        if(props.origin ==="Localiza"){
            props.setLocalizaName(event.target.value)
            props.setLocalizaAccepted(false)
        }else{
            props.setMovidaName(event.target.value)
            props.setMovidaAccepted(false)
        }
    }    

    const onChangeYear = (event) => {
        setYear(Number(event.target.value))
        if(props.origin ==="Localiza"){
            props.setLocalizaYear(Number(event.target.value))
            props.setLocalizaAccepted(false)
        }else {
            props.setMovidaYear(Number(event.target.value))
            props.setMovidaAccepted(false)
        }
    }

    const onChangeVersion = (event) => {
        setVersion(event.target.value)
        getId()   
        if(props.origin ==="Localiza"){
            props.setLocalizaVersion(event.target.value)
            props.setLocalizaAccepted(true)

        }else {
            props.setMovidaVersion(event.target.value)
            props.setMovidaAccepted(true)

        }
    }

    const getId = () => {
        props.data.filter(filter => filter.year===year && filter.name===name && filter.version===version)
            .map(car => props.origin === "Localiza" ? props.setLocalizaId(car.id): props.setMovidaId(car.id))
    }

    const noMatch = () => {
        setMatchFalse(true)
        if(props.origin ==="Localiza"){
            props.setLocalizaName("")
            props.setLocalizaYear("")
            props.setLocalizaVersion("")
            props.setLocalizaId("")
            props.setLocalizaAccepted(true)

        }else {
            props.setMovidaName("")
            props.setMovidaYear("")
            props.setMovidaVersion("")
            props.setMovidaId("")
            props.setMovidaAccepted(true)
        }
    }

    return (
        <div>
            {!matchFalse ?        
            <div className="card mb-3" style={{height: "400px", marginTop: "10px", width: '350px'}}>
                <div className="card-body text-dark">
                    <h5 className="card-title title">{props.origin}</h5>
                    <div className="card-text">
                        <div className="selects">
                            <div className="row-selects">
                                <div className="select1 form-group">
                                    <label htmlFor="nome">Nome</label>
                                    <select className="form-control" onChange={onChangeName}>
                                            <option value = "">Selecione</option>
                                            {props.data.map(car => <option value= {car.name} key ={car.id}> {car.name}</option>)}
                                    </select>
                                </div>
                                <div className="select2 form-group">
                                    <label htmlFor="nome">Ano</label>
                                    <select className="form-control" onChange={onChangeYear}>
                                        <option value = "">-</option>
                                            {props.data.filter(filter =>filter.name===name)
                                                .map(car => <option value= {car.year}key ={car.id}>{car.year}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div className="select3 form-group">
                                    <label htmlFor="nome">Versão</label>
                                    <select className="form-control" onChange={onChangeVersion}>
                                        <option value = "">Selecione</option>
                                        {props.data.filter(filter => filter.year===year && filter.name===name)
                                            .map(car => <option value= {car.version} key ={car.id}>{car.version}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="buttons">
                                <button type="button" onClick={noMatch} className="btn btn-outline-dark">Não há Match</button>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
            : <div className="card mb-3" style={{height: "400px", marginTop: "10px", width: '350px'}}>
                    <div className="card-body text-dark">
                        <div className="noMatch">
                            <h5 className="card-title title">{props.origin}</h5>
                            <img src={Ilustration} width="100%" height="50%"></img>
                            <p>Que pena que não há match!</p>
                            <button type="button" onClick={()=>setMatchFalse(false)} className="btn btn-outline-dark">Ver de novo</button>
                        </ div>
                    </div>
                </div>
            }
    </div>
    )

}


export default OtherCards;