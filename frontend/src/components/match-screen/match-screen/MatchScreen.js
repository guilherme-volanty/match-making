import React, { useState, useEffect } from 'react';
import OtherCards from '../OtherCards/OtherCards';
import WebmotorsCard from '../WebmotorsCard/WebmotorsCard'
import { Button } from "react-bootstrap"
import './MatchScreen.css'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Cookie from 'js-cookie'
import Ilustration from '../../../assets/undraw_fast_car_p4cu.png'

const urlBase = "https://upload-base-csvs.herokuapp.com/base-cars"
const urlOther = "https://upload-match-csvs.herokuapp.com/origins/"


const MatchScreen = (props) => {
    //==========WEBMOTORS==============
    const [webmotorsCars, setWebmotorsCar] = useState({})
    const [loading, setLoading] = useState(false)


    //Pegando dados de todas as bases 
    useEffect(() => {
        axios.get(urlBase)
        .then(res => {
           const car = res.data 
           setWebmotorsCar(car[Math.floor(Math.random()*car.length)])
        });
        axios.get(`${urlOther}LOCALIZA/files`)
            .then(res => {
                setLocalizaCars(res.data)
               
            });
        axios.get(`${urlOther}MOVIDA/files`)
            .then(res => {
                setMovidaCars(res.data)
            });
    }, []);


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
        base.filter(filter => filter._id === id)
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
            url: "http://ec2-34-206-3-99.compute-1.amazonaws.com:8080/match" ,
            data: {
                createDate: `${Date.now()}`,
                updateDate: null,
                webmotors: {
                    id: String(webmotorsCars.id),
                    brand: webmotorsCars.brand,
                    model: webmotorsCars.model,
                    bodywork: webmotorsCars.bodyWork,
                    modelYear: webmotorsCars.modelYear,
                    version: webmotorsCars.version
                },
                localiza: {
                    id: String(localizaId),
                    name: localizaName,
                    year: localizaYear,
                    version: localizaVersion
                },
                movida: {
                    id: String(movidaId),
                    name: movidaName,
                    year: movidaYear,
                    version: movidaVersion
                },
                user: {
                    userId:String(Cookie.getJSON("documentUserId")),
                    name: String(Cookie.getJSON("user")),
                    email: String(Cookie.getJSON("email"))
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
    }

    return (
        
        <div className="">
            { /*Backround*/}
            <div className="items-match-screen">
                <div className="Cards-match-screen">
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
                    <Button onClick={sendMatch} type="submit" className="button-match-screen" variant="primary">Enviar</Button>
                </div>
            </div>
            </div>
        )
    }

    export default MatchScreen;
