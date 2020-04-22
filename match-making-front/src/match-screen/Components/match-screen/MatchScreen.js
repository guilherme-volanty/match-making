import React, { useState, useEffect } from 'react';
import OtherCards from '../OtherCards/OtherCards';
import WebmotorsCard from '../WebmotorsCard/WebmotorsCard'
import { Button } from "react-bootstrap"
import './MatchScreen.css'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Ilustration from '../../assets/undraw_fast_car_p4cu.png'

const url = "https://5e8e241022d8cd0016a79f79.mockapi.io/matchTop/v1/"

const MatchScreen = (props) => {

    //==========WEBMOTORS==============
    const mathRandom = ((Math.random() * 10)+1).toFixed(0)
    const [webmotorsCars, setWebmotorsCar] = useState({})
    const [loading, setLoading] = useState(false)

//Funçãoque faz uma busca mais elaborada na base de dados da webmotors
// baseada na aleatoriedade

//    useEffect(()=>{
//        axios.get(`${url}Webmotors`)
//            .then(res=>{
//                axios.get(`${url}Webmotors/${res.data[mathRandom].id}`)
//                    .then(res => {
//                        setWebmotorsCar(res.data)
//                        })
//            })
//    },[])

    //Pegando dados de todas as bases 
    useEffect(() => {
        axios.get(`${url}Webmotors/4`)
        .then(res => {
           setWebmotorsCar(res.data)
        });
        axios.get(`${url}Localiza`)
            .then(res => {
                setLocalizaCars(res.data)
               
            });
        axios.get(`${url}Movida`)
            .then(res => {
                setMovidaCars(res.data)
            });
    }, []);


    //1 - AGILE  (NO MATCH BOTH)
    //3 - ASTRA (MATCH LOCALIZA)
    //5 - CELTA (MATCH BOTH)
    //9 - TORO (MATCH WEBMOTORS)

    //===========LOCALIZA===============
    const [localizaCars, setLocalizaCars] = useState([])
    const [localizaName, setLocalizaName] = useState("")
    const [localizaYear, setLocalizaYear] = useState("")
    const [localizaVersion, setLocalizaVersion] = useState("")
    const [localizaId, setLocalizaId] = useState("")
    const [localizaNoMatch, setLocalizaNoMatch] = useState(false)

    //===========MOVIDA===============
    const [movidaCars, setMovidaCars] = useState([])
    const [movidaName, setMovidaName] = useState("")
    const [movidaYear, setMovidaYear] = useState("")
    const [movidaVersion, setMovidaVersion] = useState("")
    const [movidaId, setMovidaId] = useState("")
    const [movidaNoMatch, setMovidaNoMatch]= useState(false)
    

    //Função que muda o estado dos carros da localiza e movida
    //De acordo com a mudança do que é setado id vindo do OtherCards 
    const setCar= (base, id, setName,setYear,setVersion) => {
        base.filter(filter => filter.id === id)
            .map(car => {
                setName(car.name);
                setYear(Number(car.year));
                setVersion(car.version)
                return null
            })
    }

    //Seto o modelo, ano e versao baseado no ID
    useEffect(() => {
        setCar(localizaCars,localizaId,setLocalizaName,setLocalizaYear,setLocalizaVersion);
        setCar(movidaCars,movidaId,setMovidaName,setMovidaYear,setMovidaVersion);

    }, [movidaId, localizaId])

    //Envia o match para a base de dados
    const sendMatch = () => {
        setLoading(true)
        axios({
            method: 'post',
            url: "https://rest-api-match.herokuapp.com/match",
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
                    userId: 3313,
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
    }

    if(localizaNoMatch && movidaNoMatch){
        window.location.reload()
    }

    return (
        
        <div className="">
            { /*Backround*/}
            <div className="wrap">
                <img className ="car"src = "https://assets.volanty.com/images/3.0/volanty-car2.png" alt="carro"/>
                <img className="logo"src= "https://assets.volanty.com/images/3.0/nova-logo.svg" alt="logo"/>
            </div>
            <div className="items">
                <div className="Cards">
                    <WebmotorsCard data={webmotorsCars}
                        className="webmotors" />

                    <OtherCards data={localizaCars}
                        webmotorsData={webmotorsCars}
                        setLocalizaNoMatch={setLocalizaNoMatch}
                        setLocalizaId={setLocalizaId}
                        className="localiza"
                        origin="Localiza" />

                    <OtherCards data={movidaCars}
                        webmotorsData={webmotorsCars}
                        setMovidaNoMatch={setMovidaNoMatch}
                        setMovidaId={setMovidaId}
                        className="movida"
                        origin="Movida" />
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
                    <Button onClick={sendMatch} type="submit" className="button" variant="primary">Enviar</Button>
                </div>
            </div>
            </div>
        )
    }

    export default MatchScreen;