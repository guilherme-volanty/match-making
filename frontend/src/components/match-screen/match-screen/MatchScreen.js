import React, { useState, useEffect } from 'react';

import * as firebase from "firebase";


import OtherCards from '../OtherCards/OtherCards';
import WebmotorsCard from '../WebmotorsCard/WebmotorsCard'
import { Button } from "react-bootstrap"
import './MatchScreen.css'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Ilustration from '../../../assets/undraw_fast_car_p4cu.png'
import Api from "../../../services/uploadApi";

const urlBase = "https://d1qz6xp2lbl1xi.cloudfront.net/classifier/base-cars"
const urlOther = "https://d1qz6xp2lbl1xi.cloudfront.net/databases/origins/"


function returnDuplicatedValuesWithEqualFipeID(filteredFipeId) {
    const duplicatedFipeId = filteredFipeId.reduce((previousValue, currentValue) => {
        previousValue[currentValue.fipeId] = ++previousValue[currentValue.fipeId] || 0;
        return previousValue
    }, {});
    return filteredFipeId.filter(value => duplicatedFipeId[value.fipeId || value.fipeId !== ""])
}

function returnDuplicatedValuesWithEqualWebMotorsId(filteredWebMotorsId) {
    const duplicatedWebMotorsId = filteredWebMotorsId.reduce((previousValue, currentValue) => {
        previousValue[currentValue.webmotorsId] = ++previousValue[currentValue.webmotorsId] || 0;
        return previousValue
    }, {});
    return filteredWebMotorsId.filter(value => duplicatedWebMotorsId[value.webmotorsId || value.webmotorsId !== ""])
}

function returnDuplicatedValuesWithEqualLocalizaId(filteredLocalizaId) {
    const duplicatedLocalizaId = filteredLocalizaId.reduce((previousValue, currentValue) => {
        previousValue[currentValue.localizaId] = ++previousValue[currentValue.localizaId] || 0;
        return previousValue
    }, {});
    return filteredLocalizaId.filter(value => duplicatedLocalizaId[value.localizaId] && value.localizaId !== "")
}


const MatchScreen = (props) => {
    //==========WEBMOTORS==============
    const [webmotorsCars, setWebmotorsCar] = useState({})
    const [loading, setLoading] = useState(false)

    //Math.floor(Math.random()*car.length)

    //Pegando dados de todas as bases
    useEffect(() => {
        const loadAllCars = async () => {
            const cars = await Api.getClassfier();

            // Filtro para WebMotorsId
            var filteredWebMotorsId = cars.data.filter(value => value.webmotorsId !== "");
            const duplicatedWebMotorsId = returnDuplicatedValuesWithEqualWebMotorsId(filteredWebMotorsId)
            setWebmotorsCar(duplicatedWebMotorsId[1])
            console.log(duplicatedWebMotorsId[1]);
            console.log(duplicatedWebMotorsId);

            //filtro para FipeId
            const filteredFipeId = cars.data.filter(value => value.fipeId !== "");
            const duplicatedFipeId = returnDuplicatedValuesWithEqualFipeID(filteredFipeId)
            setMovidaCars(duplicatedFipeId)
            console.log(duplicatedFipeId);


            //Filtro para LocalizaId
            var filteredLocalizaId = cars.data.filter(value => value.localizaId !== "");
            const duplicatedLocalizaId = returnDuplicatedValuesWithEqualLocalizaId(filteredLocalizaId)
            setLocalizaCars(duplicatedLocalizaId)
            console.log(duplicatedLocalizaId);

        }


        // axios.get(`${urlOther}LOCALIZA/files`)
        //     .then(res => {
        //         setLocalizaCars(res.data)
        //
        //     });
        //
        // axios.get(`${urlOther}MOVIDA/files`)
        //     .then(res => {
        //         setMovidaCars(res.data)
        //     });

        loadAllCars()
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
    const setCar = (base, id, setName,setYear,setVersion) => {
        base.filter(filter => filter._id === id)
            .map(car => {
                setName(car.name);
                setYear(Number(car.modelYear));
                setVersion(car.version)
                return null
            })
    }

    //Seto o modelo, ano e versao baseado no ID
    useEffect(() => {
        setCar(localizaCars,localizaId,setLocalizaName,setLocalizaYear,setLocalizaVersion);
        setCar(movidaCars,movidaId,setMovidaName,setMovidaYear,setMovidaVersion);
    }, [movidaId, localizaId])


    //AUTH
    const [name, setName] = useState()
    const [id, setId] = useState()
    const [email, setEmail] = useState()

    var user = firebase.auth().currentUser;
    useEffect(() => {
        if(user!=null){
            setId(user.uid)
            setName(user.displayName)
            setEmail(user.email)
        }
    }, [user])

    //Envia o match para a base de dados
    const sendMatch = () => {
        setLoading(true)
        axios({
            method: 'post',
            url: "https://d1qz6xp2lbl1xi.cloudfront.net/matches/match" ,
            data: {
                createDate: `${Date.now()}`,
                updateDate: null,
                webmotors: {
                    id: String(webmotorsCars.id),
                    brand: webmotorsCars.brand,
                    model: webmotorsCars.model,
                    bodywork: webmotorsCars.factoryYear,
                    modelYear: webmotorsCars.modelYear,
                    version: webmotorsCars.version
                },
                localiza: {
                    id: String(localizaId),
                    name: localizaName,
                    modelYear: localizaYear,
                    version: localizaVersion
                },
                movida: {
                    id: String(movidaId),
                    name: movidaName,
                    modelYear: movidaYear,
                    version: movidaVersion
                },
                user: {
                    userId:String(id),
                    name: String(name),
                    email: String(email)
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
