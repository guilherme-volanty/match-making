import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Button } from "react-bootstrap"
import "../Style/OtherCards.css"
import axios from 'axios'

const OtherCards = (props) => {

    const url = `https://5e8e241022d8cd0016a79f79.mockapi.io/matchTop/v1/${props.origin}`
    const [cars, setCars] = useState([])
    const [origin, setOrigin] = useState("")
    const [form,setForm] = useState({name:"", year:"", version:""})
    const [accepted, setAccepted] = useState(false)

    useEffect(() => {
        axios.get(url)
        .then(res => {
            setCars(res.data)
            setOrigin(res.data[0].origin)
        });
    },[])

    const onChangeSelect = field => event => {
        setForm({
            ...form,
            [field]: (event.target.value)
        });
        
    }


    if(accepted){alert("Aceito")}


    const submitCard = () => {
        if(form.name !== "" && form.version!== "" && form.year!=="") {
            alert(`Card da ${origin} Enviado com sucesso`)
            setAccepted(true)
            console.log(form)
        }
        else{
            alert("Digite tudo")
        }
    }

    
    return (

        <div className="card border-secondary mb-3" style={{height: "400px", marginTop: "10px", width: '350px'}}>
            <div className="card-body text-dark">  
                <h5 className="card-title title">{origin}</h5>
                <div className="card-text">
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
                            <Button variant="outline-primary" type="submit" onClick={submitCard}>Enviar</Button>{' '}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default OtherCards;