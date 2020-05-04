import React from 'react';
import "./OtherCards.css"
import Ilustration from '../../../assets/undraw_towing_6yy4.png'

const OtherCards = (props) => {

    const onChangeId = (event) => {
        if(props.origin ==="Localiza"){
            props.setLocalizaId(event.target.value)

        }else {
            props.setMovidaId(event.target.value)
        }
    }

    //Verificar se há um carro do mesmo modelo e ano
    // na base de dados vigente
    const checkHasCar = () =>{
        const regex = new RegExp("\\b"+props.webmotorsData.model+"\\b", "gi")
        var filter = props.data.filter(filter =>filter.year === props.webmotorsData.modelYear &&
            filter.name.match(regex))
        return filter
    }

    return (
        <>
            {/* Checa se o tamanho da lista de filtro é maior que zero*/}
            {checkHasCar().length >0 ?        
            <div className="card mb-3-match-screen">
                {/*Atribuindo que há um match correspondente*/}
                {props.origin==="Localiza"? props.setLocalizaNoMatch(false):props.setMovidaNoMatch(false)}
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
                                    <select className="form-control" placeholder="Selecione" onChange={onChangeId}>
                                        <option defaultValue value = "">Não há Match</option>
                                        {checkHasCar()
                                            .map(car => <option value= {car._id} key ={car._id}>{car.version}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
            :<div className="card mb-3-match-screen" style={{height: "400px", marginTop: "10px", width: '350px'}}>
                {/*Atribuindo que não há um match correspondente*/}
                {props.data.length>0 ? props.origin==="Localiza" ? props.setLocalizaNoMatch(true):props.setMovidaNoMatch(true):<span></span>}
                    <div className="card-body text-dark">
                        <div className="noMatch">
                            <h5 className="card-title title">{props.origin}</h5>
                            <img src={Ilustration} alt="ilustração" width="100%" height="50%"></img>
                            <p>Que pena, não há match! Infelizmente a {props.origin} não possui nenhum {props.webmotorsData.model}/{props.webmotorsData.modelYear} </p>
                        </ div>
                    </div>
                </div>
            }
    </>
    )

}


export default OtherCards;
