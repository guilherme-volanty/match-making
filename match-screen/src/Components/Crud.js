import React, {Fragment, useState, useEffect} from "react"; 
import axios from "axios";
import '../Style/Crud.css'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'



const url = "https://5e8e241022d8cd0016a79f79.mockapi.io/matchTop/v1/"

const Crud = () => {
    const [data, setData] = useState([])
    const [openEdit, setOpenEdit] = useState(false);
    const [idToOpen, setIdToOpen] = useState()

    useEffect(() => {
        axios.get("http://localhost:3001/match/all")
            .then(res => {
                setData(res.data)
            })

    },[data])

    useEffect(()=>{
        axios.get(`${url}Localiza`)
        .then(res => { 
            setLocalizaCars(res.data)
        })
        axios.get(`${url}Movida`)
        .then(res => { 
            setMovidaCars(res.data)
        })
    }, [])


    
    const deleteItem = (id) => {
        axios.delete(`http://localhost:3001/match/delete/${id}`)
            .then((res) =>{
                const filtrado = data.filter(item => item.id !== id);
                setData(filtrado);
            })
    }

    const setaEdit = (id) =>{
        setOpenEdit(!openEdit)
        setIdToOpen(id)
    }

    //=========LOCALIZA==============
    const [localizaCars,setLocalizaCars] = useState([]);
    const [localizaName,setLocalizaName] = useState("");
    const [localizaYear, setLocalizaYear] = useState("");
    const [localizaId, setLocalizaId] = useState(0)
    const [localizaVersion, setLocalizaVersion] = useState("");


    //==========MOVIDA===============
    const [movidaCars, setMovidaCars] = useState([]);
    const [movidaName, setMovidaName] = useState(""); 
    const [movidaYear, setMovidaYear] = useState("");
    const [movidaId, setMovidaId] = useState(0);
    const [movidaVersion, setMovidaVersion] = useState("");

    useEffect(() => {
        localizaCars.filter(filter => filter.year===localizaYear && filter.name===localizaName && filter.version===localizaVersion)
            .map(car => setLocalizaId(car.id))
        movidaCars.filter(filter => filter.year===movidaYear && filter.name===movidaName && filter.version===movidaVersion)
            .map(car =>(setMovidaId(car.id)))
    }, [movidaVersion,localizaVersion])

    const updateMatch = (id) => {
        if(localizaName!=="" && localizaYear!=="" && localizaYear!==""
        && movidaName!=="" && movidaYear!=="" && movidaVersion!==""){
            axios({
                method: 'put',
                url: `http://localhost:3001/match/update/${id}`,
                data: {
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
                    }
                }
            }).then(res =>{
                alert("Enviado com sucesso")
            }).catch(error=> {
                console.log(error)
            })
        }else{
            alert("Digite todos os campos")
        }
    }


    const renderizaLinha = record => {
            return(
                <Fragment  key = {record._id}>
                    <tr className='table' key = {record._id}>
                            <th >{record.webmotors.brand} {record.webmotors.model} {record.webmotors.year} {record.webmotors.version}{record.webmotors.bodywork}</th>
                            <td>{record.localiza.name} {record.localiza.year} {record.localiza.version}</td>
                            <td>{record.movida.name} {record.movida.year} {record.movida.version}</td>
                            <td>{record.user.name}</td>
                        <td className="buttons"> 
                            <button onClick={(e)=>setaEdit(record._id)} className="btn btn-outline-warning">  Editar </button>
                            <Popup
                                trigger={<button className="button" className="btn btn-outline-danger"> Remover </button>}
                                modal
                                >
                                <div className='content'>
                                    <div className="modalHeader"><p>Deseja remover? </p></div>
                                    <div className="modalButtons">
                                        <button type="button" onClick={() => deleteItem(record._id)} className="btn btn-outline-danger"> Confirmar </button>    
                                    </div>
                                </div>
                            </Popup>
                        </td>
                    </tr>

                    <div>
                        {openEdit===true && record._id === idToOpen&&
                        <div className = "container">
                                <div className="localiza"> 
                                    <h5 className="title">LOCALIZA</h5>
                                    <div className ="name">
                                        <span>NOME</span>
                                        <select onChange={(e) => setLocalizaName(e.target.value)} className="form-control" >
                                            <option value = "">Selecione</option>
                                            {localizaCars.map(car => <option value= {car.name} key ={car.id}> {car.name}</option>)}
                                        </select>
                                    </div>
                                    <div className ="year">
                                        <span>ANO</span>
                                        <select className="form-control" onChange={(e) => setLocalizaYear(Number(e.target.value))}  >
                                            <option value = "">Selecione</option>
                                            {localizaCars.filter(filter =>filter.name===localizaName)
                                                .map(car => <option value= {car.year}key ={car.id}>{car.year}</option>)}
                                        </select>
                                    </div>
                                    <div className ="version">
                                        <span>VERSÃO</span>
                                        <select className="form-control" onChange={(e) => setLocalizaVersion(e.target.value)} >
                                            <option value = "">Selecione</option>
                                            {localizaCars.filter(filter => filter.year===localizaYear && filter.name===localizaName)
                                                .map(car => <option value= {car.version} key ={car.id}>{car.version}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="division">
                                </div>
                                <div className="movida"> 
                                <h5 className="title">MOVIDA</h5>
                                <div className ="name">
                                    <span>NOME</span>
                                    <select className="form-control" onChange={(e) => setMovidaName(e.target.value)} >
                                        <option value = "">Selecione</option>
                                        {movidaCars.map(car => <option value= {car.name} key ={car.id}> {car.name}</option>)}
                                    </select>
                                </div>
                                <div className ="year">
                                    <span>ANO</span>
                                    <select className="form-control"onChange={(e) => setMovidaYear(Number(e.target.value))} >
                                        <option value = "">Selecione</option>
                                        {movidaCars.filter(filter =>filter.name===movidaName)
                                                .map(car => <option value= {car.year}key ={car.id}>{car.year}</option>)}
                                    </select>
                                </div>
                                <div className ="version">
                                    <span>VERSÃO</span>
                                    <select className="form-control" onChange={(e) => setMovidaVersion(e.target.value)}>
                                        <option value = "">Selecione</option>
                                        {movidaCars.filter(filter => filter.year===movidaYear && filter.name===movidaName)
                                                .map(car => <option  value= {car.version} key ={car.id}>{car.version}</option>)}
                                    </select>
                                </div>
                                <button type="button" className="btn btn-outline-primary" onClick={() => {updateMatch(record._id)}}> Salvar</button>
                            </div>
                        </div>    
                        }
                    </div>
                </Fragment>
            );
    }

    return(
        <div className = "table">
            <div className="space"></div>

        <h1>TABELA DE MATCHS</h1>
        <Link to="/match-screen" className="link btn btn-outline-primary">NOVO MATCH</Link>

        <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">WEBMOTORS</th>
                    <th scope="col">LOCALIZA</th>
                    <th scope ="col"> MOVIDA </th>
                    <th scope ="col"> COLABORADOR </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map(renderizaLinha)}
            </tbody>
            </table>
    </div>
    )
}

export default Crud

