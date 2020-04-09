import React, { useState, useEffect } from 'react'; 
import OtherCards from './OtherCards';
import WebmotorsCard from './WebmotorsCard'
import { Button } from "react-bootstrap"
import '../Style/MatchScreen.css'
import axios from 'axios';

const url = "https://5e8e241022d8cd0016a79f79.mockapi.io/matchTop/v1/"

const MatchScreen = () =>{
    //==========WEBMOTORS==============
    const [webmotorsCars, setWebmotorsCar] = useState({})

    useEffect(() => {
        axios.get(`${url}Webmotors/${((Math.random() * 10) + 1).toFixed(0)}`)
            .then(res => {
                setWebmotorsCar(res.data)
            })
    }, []);

    //===========LOCALIZA===============
    const [LocalizaCars, setLocalizaCars] = useState([])
    const [localizaName, setLocalizaName] = useState("")
    const [localizaYear, setLocalizaYear] = useState("")
    const [localizaVersion, setLocalizaVersion] = useState("")
    const [localizaAccepted, setLocalizaAccepted] = useState(false)



    useEffect(() => {
        axios.get(`${url}Localiza`)
        .then(res => {
            setLocalizaCars(res.data)
        });
    },[])


    //===========MOVIDA===============
    const [MovidaCars, setMovidaCars] = useState([])
    const [movidaName, setMovidaName] = useState("")
    const [movidaYear, setMovidaYear] = useState("")
    const [movidaVersion, setMovidaVersion] = useState("")
    const [movidaAccepted, setMovidaAccepted] = useState(false)
    useEffect(() => {
        axios.get(`${url}Movida`)
        .then(res => {
            setMovidaCars(res.data)
        });
    },[])

    return(
        <div className="items">
            <div className = "Cards">
                <WebmotorsCard data ={webmotorsCars}
                className="webmotors"/>


                <OtherCards data = {LocalizaCars}
                    setLocalizaName={setLocalizaName}
                    setLocalizaYear={setLocalizaYear}
                    setLocalizaVersion={setLocalizaVersion}
                    setLocalizaAccepted={setLocalizaAccepted}
                    className = "localiza"
                    origin = "Localiza"/>

                <OtherCards data={MovidaCars}
                    setMovidaName={setMovidaName}
                    setMovidaYear={setMovidaYear}
                    setMovidaVersion={setMovidaVersion}
                    setMovidaAccepted={setMovidaAccepted}
                    className = "movida"
                    origin = "Movida"/>
            </div>
            <div className="Button">
            {localizaAccepted===true && movidaAccepted===true &&<Button className= "button"variant="primary">Enviar</Button>}
            </div>
        </div>
    )
}

export default MatchScreen;