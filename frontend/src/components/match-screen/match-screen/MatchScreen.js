import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import './MatchScreen.css';
import User from '../../../services/user';
import Api from '../../../services/databasesApi';
import postMatch from '../../../services/matchApi';
import Dedupe from '../../../services/dedupe';
import MatchCard from '../MatchCard/index';
import Modal from 'react-bootstrap/Modal';
import Ilustration from '../../../assets/undraw_fast_car_p4cu.png';

const MatchScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [webmotorsCars, setWebmotorsCar] = useState([]);
    const [localizaCars, setLocalizaCars] = useState([]);
    const [fipeCars, setFipeCars] = useState([]);
    const [fipeVersion, setFipeVersion] = useState([]);
    const [webmotorsVersion, setWebmotorsVersion] = useState([]);
    const [selectWebmotorsVersion, setSelectWebmotorsVersion ] = useState('Não há Match');
    const [selectFipeVersion, setSelectFipeVersion ] = useState('Não há Match');
    const [webmotorsId, setWebmotorsId] = useState([])
    const [fipeId, setFipeId] = useState([])

    //AUTH
    const [name, setName] = useState()
    const [id, setId] = useState()
    const [email, setEmail] = useState()
    
    const user = User();    
    
    useEffect(() => {
        if(user!=null){
            setId(user.uid)
            setName(user.displayName)
            setEmail(user.email)
        }
    }, [user])
    
    //Pegando dados duplicados de todas as bases
    useEffect(() => {
        const loadAllCars = async () => {
            const cars = await Api.getClassfier();
            setWebmotorsCar(Dedupe.webmotors(cars));
            setFipeCars(Dedupe.fipe(cars))
            setLocalizaCars(Dedupe.localiza(cars))
        }
        loadAllCars()
    }, [])

    const brands = localizaCars.brand;
    const model = localizaCars.model;
    const modelYear = localizaCars.modelYear;
    const factoryYear = localizaCars.factoryYear;

    useEffect(() =>{
        const getWebmotorsVersion = async () => {
            const version = await Api.getWebmotorsVersion(brands, model, modelYear, factoryYear) //TODO ROTA COM FACTORY YEAR
            const versionState = version.data;
            setWebmotorsVersion(versionState)
        }
        getWebmotorsVersion();
    }, [localizaCars])

    useEffect(() =>{
        const getFipeVersion = async () => {
            const version = await Api.getFipeVersion(brands, model, modelYear) 
            const versionState = version.data;
            setFipeVersion(versionState);
        }
        getFipeVersion();
    }, [localizaCars])

    const handleWebmotorsVersionChange = (selectedVersion) => {
        setSelectWebmotorsVersion(selectedVersion)
    }

    const handleFipeVersionChange = (selectedVersion) => {
        setSelectFipeVersion(selectedVersion)
    }

    useEffect(() => {
        const getWebmotorsId = async () =>{
            const response = await Api.getWebmotorsId(brands, model, modelYear, factoryYear, selectWebmotorsVersion)
            setWebmotorsId(response)
        }
        getWebmotorsId();
    }, [selectWebmotorsVersion])

    useEffect(() => {
        const getFipeId = async () =>{
            const response = await Api.getFipeId(brands, model, modelYear, selectFipeVersion)
            setFipeId(response);
        }
        getFipeId();
    }, [selectFipeVersion])


    //Envia o match para a base de dados
    const sendMatch = () => {
        setLoading(true)
        postMatch(brands, 
                  model, 
                  modelYear,
                  factoryYear, 
                  id, 
                  name, 
                  email,
                  localizaCars, 
                  webmotorsId,
                  fipeId,
                  selectWebmotorsVersion, 
                  selectFipeVersion)
        setLoading(false)
        console.log("Enviou para o Mongo")
    }

    return (

        <div className="">
            { /*Backround*/}
            <div className="items-match-screen">
                <div className="Cards-match-screen" >

                    <MatchCard data={localizaCars}
                               targetDatabase={true}
                               className="localiza"
                               database="Localiza" />

                    <MatchCard data={localizaCars}
                               version={webmotorsVersion}
                               onVersionChange={handleWebmotorsVersionChange} 
                               targetDatabase={false}
                               className="webmotors"
                               database="Webmotors" />

                    <MatchCard data={localizaCars}
                               version={fipeVersion}
                               onVersionChange={handleFipeVersionChange} 
                               targetDatabase={false}
                               className="fipe"
                               database="Fipe" />
                    { /*Animação que ocorre enquanto o match está sendo enviado*/}
                    <Modal show={loading} animation={true}>
                        <Modal.Header style={{ position: 'center' }} >
                            <Modal.Title  > CARREGANDO...</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img alt="logo-volanty" style={{ display: "block", marginLeft: "auto", marginRight: "auto", width: "50%"}}
                                 width="60%"
                                 src="https://assets.volanty.com/images/3.0/nova-logo.svg" />
                            <img alt="ilustration"  width="100%"src ={Ilustration} />
                            <p style={{ textAlign: 'center' }}>Enviando</p>
                        </Modal.Body>
                    </Modal>
                </div>
                <div className="Button">
                    <Button onClick={sendMatch} type="submit" className="button-match-screen" variant="primary">Enviar</Button>
                </div>
            </div>
        </div>
    )
}

export default MatchScreen;
