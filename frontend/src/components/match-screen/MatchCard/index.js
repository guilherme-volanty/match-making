import React from 'react';
import "./styles.css";
import LoadingComponent from '../../misc/loading/index';

const MatchCard = (props) => {
    const handleChange = (e) =>{
        props.onVersionChange(e.target.value)
    }
    return (
        <div className="card mb-3-match-screen" >
            <div className="card-body text-dark">
                <h5 className="card-title title ">{props.database}</h5>
                <div className ="card-text ">
                    {props.data._id?
                    <div className="attributes">
                        <div className="row-attributes">
                            <div className="attribute1">
                                <span className="attributeName">Marca</span>
                                <span> {props.data.brand}</span>
                            </div>
                            <div className="attribute2">
                                <span className="attributeName">Modelo</span>
                                <span> {props.data.model}</span>
                            </div>
                        </div>
                        <div className="row-attributes">
                            <div className="attribute3">
                                <span className="attributeName">Ano de Modelo</span>
                                <span> {props.data.modelYear}</span>
                            </div>
                            <div className="attribute4">
                                <span className="attributeName">Ano de Fabricação</span>
                                <span> {props.data.factoryYear}</span>
                            </div>
                        </div>
                        <div className="attribute5">
                            {props.targetDatabase ?
                                <div className="selectedVersion"> 
                                    <span className="attributeName"> Versão </span>
                                    <span> {props.data.versionLocaliza} </span>
                                </div>
                                :<div className="selectedVersion">
                                    <label className="attributeName" htmlFor="nome">Versão</label>
                                        <select className="form-control" placeholder="Selecione" onChange={handleChange}>
                                            <option defaultValue value = "Não há Match">Não há Match</option>
                                            {props.version.map((version, idx) => (
                                            <option key={idx} value={version}>{version}</option>
                                            ))}
                                        </select>
                                </div>}
                        </div>
                    </div>:<LoadingComponent />}
                </div>
            </div>
        </div>
    )
}


export default MatchCard; 
