import React, { useState, useEffect } from 'react';
import OtherCards from './OtherCards';
import WebmotorsCard from './WebmotorsCard'
import { Button } from "react-bootstrap"
import '../Style/MatchScreen.css'
import '../Style/background.css'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Ilustration from '../assets/undraw_fast_car_p4cu.png'

const url = "https://5e8e241022d8cd0016a79f79.mockapi.io/matchTop/v1/"

const MatchScreen = () => {
    //==========WEBMOTORS==============
    const mathRandom = ((Math.random() * 10)+1).toFixed(0)
    const [webmotorsCars, setWebmotorsCar] = useState({})
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        axios.get(`${url}Webmotors/4`)
            .then(res => {
                setWebmotorsCar(res.data)
            })
    }, []);

    //===========LOCALIZA===============
    const [LocalizaCars, setLocalizaCars] = useState([])
    const [localizaName, setLocalizaName] = useState("")
    const [localizaYear, setLocalizaYear] = useState("")
    const [localizaVersion, setLocalizaVersion] = useState("")
    const [localizaId, setLocalizaId] = useState("")
    const [localizaAccepted, setLocalizaAccepted] = useState(false)

    useEffect(() => {
        axios.get(`${url}Localiza`)
            .then(res => {
                setLocalizaCars(res.data)
            });
    }, [])

    //===========MOVIDA===============
    const [MovidaCars, setMovidaCars] = useState([])
    const [movidaName, setMovidaName] = useState("")
    const [movidaYear, setMovidaYear] = useState("")
    const [movidaVersion, setMovidaVersion] = useState("")
    const [movidaId, setMovidaId] = useState("")
    const [movidaAccepted, setMovidaAccepted] = useState(false)
    useEffect(() => {
        axios.get(`${url}Movida`)
            .then(res => {
                setMovidaCars(res.data)
            });
    }, [])

    useEffect(() => {
        LocalizaCars.filter(filter => filter.id===localizaId)
            .map(car => setLocalizaName(car.name))
        LocalizaCars.filter(filter => filter.id===localizaId)
            .map(car => setLocalizaYear(Number(car.year)))
        LocalizaCars.filter(filter => filter.id===localizaId)
            .map(car => setLocalizaVersion(car.version))

        MovidaCars.filter(filter => filter.id===movidaId)
            .map(car => setMovidaName(car.name))
        MovidaCars.filter(filter => filter.id===movidaId)
            .map(car => setMovidaYear(Number(car.year)))
        MovidaCars.filter(filter => filter.id===movidaId)
            .map(car => setMovidaVersion(car.version))

    }, [movidaId,localizaId])


    const sendForm = () => {
        if(movidaAccepted===true && localizaAccepted===true){
            setLoading(true)
            axios({
                method: 'post',
                url: "http://localhost:3001/match",
                data: {
                    operationId: `${mathRandom}`,
                    createDate: `${Date.now()}`,
                    updateDate: null,
                    webmotors: {
                        id: webmotorsCars.id,
                        brand: webmotorsCars.brand,
                        model: webmotorsCars.model,
                        bodywork: webmotorsCars.carroceria,
                        modelYear: webmotorsCars.modelYear,
                        version: webmotorsCars.version
                    },
                    localiza: {
                        id: localizaId,
                        name: localizaName,
                        year: localizaYear,
                        version: localizaVersion
                    },
                    movida: {
                        id: movidaId,
                        name: movidaName,
                        year: movidaYear,
                        version: movidaVersion
                    },
                    user: {
                        userId: 3213,
                        name: "Alysson",
                        email: "alysson@volanty.com"
                    }
                }
            }).then(res =>{
                console.log({message:"Enviado com sucesso"})
                window.location.reload()

                
            }).catch(error=> {
                setLoading(false)
                console.log(error)
                alert("Tivemos um problema para enviar seus dados, tente novamente mais tarde!")
            })
        }else{
            alert("Preencha o todos os campos")
        }
    }

    return (
        <div className="">
            <div className="wrap">
                <img className ="car"src = "https://assets.volanty.com/images/3.0/volanty-car2.png" alt="carro"/>
                <img className="logo"src= "https://assets.volanty.com/images/3.0/nova-logo.svg" alt="logo"/>
            </div>
            <div className="items">

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
                
                <div className="Cards">
                    <WebmotorsCard data={webmotorsCars}
                        className="webmotors" />

                    <OtherCards data={LocalizaCars}
                        webmotorsData={webmotorsCars}
                        setLocalizaAccepted={setLocalizaAccepted}
                        setLocalizaId={setLocalizaId}
                        className="localiza"
                        origin="Localiza" />

                    <OtherCards data={MovidaCars}
                        webmotorsData={webmotorsCars}
                        setMovidaAccepted={setMovidaAccepted}
                        setMovidaId={setMovidaId}
                        className="movida"
                        origin="Movida" />
                </div>
                <div className="Button">
                    <Button onClick={sendForm} type="submit" className="button" variant="primary">Enviar</Button>
                </div>
            </div>
            </div>
        )
    }

    export default MatchScreen;