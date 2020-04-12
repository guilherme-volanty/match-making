import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Button } from "react-bootstrap"
import "../Style/OtherCards.css"

const OtherCards = (props) => {

    const [name, setName] = useState("")
    const [year, setYear] = useState("")
    const [version, setVersion] = useState("")

    const onChangeName = (event) => {
        setName(event.target.value)
        if(props.origin ==="Localiza"){
            props.setLocalizaName(event.target.value)
        }else{
            props.setMovidaName(event.target.value)
        }
    }    

    const onChangeYear = (event) => {
        setYear(event.target.value)
        if(props.origin ==="Localiza"){
            props.setLocalizaYear(event.target.value)
        }else {
            props.setMovidaYear(event.target.value)
        }        
    }

    const onChangeVersion = (event) => {
        setVersion(event.target.value)
        if(props.origin ==="Localiza"){
            props.setLocalizaVersion(event.target.value)
        }else {
            props.setMovidaVersion(event.target.value)
        }
    }

    const submitCard = () => {
        if(name !== "" && version!== "" && year!=="") {
            alert(`Card da ${props.origin} Enviado com sucesso`)
            if(props.origin === "Localiza"){
                props.setLocalizaAccepted(true)
            }else{
                props.setMovidaAccepted(true)
            }
        }
        else{
            alert("Digite tudo")
        }
    }

    return (

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
                                    {props.data.map(car => <option value= {car.year} key ={car.id}> {car.year}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <div className="select3 form-group">
                                <label htmlFor="nome">Nome</label>
                                <select className="form-control" onChange={onChangeVersion}>
                                    <option value = "">Selecione</option>
                                    {props.data.map(car => <option value= {car.version}key ={car.id}> {car.version}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="buttons">
                            <Button variant="outline-primary" type="submit" onClick={submitCard}>Enviar</Button>{' '}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default OtherCards;