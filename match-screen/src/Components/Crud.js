import React, {Fragment, useState, useEffect} from "react"; 
import axios from "axios";
import '../Style/Crud.css'
import {Link} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'




const url = "https://5e8e241022d8cd0016a79f79.mockapi.io/matchTop/v1/"

const Crud = () => {
    const [data, setData] = useState([])
    const [refreshData, setRefreshData]=useState(false)
    const [openEdit, setOpenEdit] = useState(false);

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

        setRefreshData(!refreshData)
            axios({
                method: 'put',
                url: `http://localhost:3001/match/update/${id}`,
                data: {
                    updateDate: `${Date.now()}`,
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
                setaEdit(false)
            }).catch(error=> {
                console.log(error)
            })
    }
    useEffect(() => {
        localizaCars.filter(filter => filter.id===localizaId)
            .map(car => setLocalizaName(car.name))
        localizaCars.filter(filter => filter.id===localizaId)
            .map(car => setLocalizaYear(Number(car.year)))
        localizaCars.filter(filter => filter.id===localizaId)
            .map(car => setLocalizaVersion(car.version))

        movidaCars.filter(filter => filter.id===movidaId)
            .map(car => setMovidaName(car.name))
        movidaCars.filter(filter => filter.id===movidaId)
            .map(car => setMovidaYear(Number(car.year)))
        movidaCars.filter(filter => filter.id===movidaId)
            .map(car => setMovidaVersion(car.version))

    }, [movidaId,localizaId])


    //Modal States
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const [idEdit, setIdEdit] = useState()
    const [idRemove, setIdRemove] = useState()
    const [showRemove, setShowRemove] = useState(false)
    const handleCloseRemove = () => setShowRemove(false);


    const openEditCar = (id) =>{
        setShow(true)
        setIdEdit(id)
    }


    const openRemoveCar = (id)=>{
        setShowRemove(true)
        setIdRemove(id)
    }





    const renderizaLinha = record => {
            return(
                <Fragment  key = {record._id}>
                    <tr className='table' key = {record._id}>
                            <th >{record.webmotors.brand} {record.webmotors.model} {record.webmotors.modelYear} {record.webmotors.version} {record.webmotors.bodywork}</th>
                            <td>{record.localiza.name} {record.localiza.year} {record.localiza.version}</td>
                            <td>{record.movida.name} {record.movida.year} {record.movida.version}</td>
                            <td>{record.user.name}</td>
                        <td className="buttons"> 
                        <button onClick={()=> openEditCar(record._id)} className="btn btn-outline-warning">  Editar </button>
                        <button  onClick={()=>openRemoveCar(record._id)}  className="btn btn-outline-danger"> Remover </button>
                        {record._id === idEdit?
                                <Modal show={show} onHide={handleClose} animation={true}>
                                    <Modal.Header style={{ position: 'center' }} closeButton >
                                    <Modal.Title  > EDITAR </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    
                                    <div className ="content">
                                        <div className="webmotors"> 
                                            <div className ="name">
                                                <p>CARRO NA WEBMOTORS</p>
                                                    <span>
                                                    {record.webmotors.brand} {record.webmotors.model} {record.webmotors.modelYear} {record.webmotors.version} {record.webmotors.bodywork}
                                                    </span>
                                        </div>
                                    </div>
                                    <div className = "container">
                                        <div className="localiza"> 
                                            <h5 className="title">LOCALIZA</h5>
                                            <div className ="name">
                                                <p>NOME</p>
                                                {localizaCars.filter(filter => filter.year===record.webmotors.modelYear && filter.name.match("\\b"+record.webmotors.model+"\\b")).length>0?
                                                    <span>{record.webmotors.brand} {record.webmotors.model}</span>
                                                    : <span> Não há esse carro na Localiza </span>}
                                            </div>
                                            <div className ="year">
                                                <p>ANO</p> 
                                                {localizaCars.filter(filter => filter.year===record.webmotors.modelYear && filter.name.match("\\b"+record.webmotors.model+"\\b")).length>0?
                                                <span>{record.webmotors.modelYear}</span>
                                                :  <span> - </span>}
                                            </div>
                                            <div className ="version">
                                                <p>VERSÃO</p>
                                                {localizaCars.filter(filter => filter.year===record.webmotors.modelYear && filter.name.match("\\b"+record.webmotors.model+"\\b")).length>0?
                                                <select className="form-control" onChange={(e) => setLocalizaId(e.target.value)} >
                                                    <option disabled>Selecione</option>
                                                    {localizaCars.filter(filter => filter.year===record.webmotors.modelYear && filter.name.match("\\b"+record.webmotors.model+"\\b"))
                                                        .map(car => <option value= {car.id} key ={car.id}>{car.version}</option>)}
                                                </select>
                                                :  <span> - </span>}

                                            </div>
                                        </div>
                                        <div className="movida"> 
                                        <h5 className="title">MOVIDA</h5>
                                        <div className ="name">
                                            <p>NOME</p>
                                            {movidaCars.filter(filter => filter.year===record.webmotors.modelYear && filter.name.match("\\b"+record.webmotors.model+"\\b")).length>0?
                                            <span>{record.webmotors.brand} {record.webmotors.model}</span>
                                            : <span> Não há esse carro na Movida </span>}
                                        </div>
                                        <div className ="year">
                                            <p>ANO</p>
                                            {movidaCars.filter(filter => filter.year===record.webmotors.modelYear && filter.name.match("\\b"+record.webmotors.model+"\\b")).length>0?
                                            <span>{record.webmotors.modelYear}</span>
                                            : <span> - </span>}

                                        </div>
                                        <div className ="version">
                                            <p>VERSÃO</p>
                                            {movidaCars.filter(filter => filter.year===record.webmotors.modelYear && filter.name.match("\\b"+record.webmotors.model+"\\b")).length>0?
                                            <select className="form-control" onChange={(e) => setMovidaId(e.target.value)}>
                                                <option disabled >Selecione</option>
                                                {movidaCars.filter(filter => filter.year===record.webmotors.modelYear && filter.name.match("\\b"+record.webmotors.model+"\\b"))
                                                        .map(car => <option value= {car.id} key ={car.id}>{car.version}</option>)}
                                            </select>
                                            : <span> - </span>}
                                        </div>
                                    </div>
                                </div> 
                                <div className="modalButtons">

                                    <button type="button" className="btn btn-outline-secondary" onClick={handleClose}> Cancelar</button>
                                    <button type="button" className="btn btn-outline-primary" onClick={() => {updateMatch(record._id)}}> Salvar</button>
                                </div>                            
                                </div> 
                                    </Modal.Body>
                                </Modal>: <span></span> }

                                {record._id === idRemove?                        
                                <Modal show={showRemove} onHide={handleCloseRemove} animation={true}>
                                    <Modal.Header style={{ position: 'center' }} closeButton >
                                    <Modal.Title  > DESEJA REMOVER?</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className='content'>
                                            <div className="modalButtons">
                                                <button type="button" className="btn btn-outline-secondary" onClick={handleCloseRemove}> Cancelar</button>
                                                <button type="button" onClick={() => deleteItem(record._id)} className="btn btn-outline-danger"> Confirmar </button>    
                                            </div>
                                        </div>
                                    </Modal.Body>
                                </Modal>: <span></span> }
                        </td>
                    </tr>
                    
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

