import React, {Fragment, useState, useEffect} from "react"; 
import axios from "axios";
import '../Style/Crud.css'


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
    const [localizaVersion, setLocalizaVersion] = useState("");


    //==========MOVIDA===============
    const [movidaCars, setMovidaCars] = useState([]);
    const [movidaName, setMovidaName] = useState(""); 
    const [movidaYear, setMovidaYear] = useState("");
    const [movidaVersion, setMovidaVersion] = useState("");

    const updateMatch = (id) => {
        console.log(id)
        if(localizaName!=="" && localizaYear!=="" && localizaYear!==""
        && movidaName!=="" && movidaYear!=="" && movidaVersion!==""){
            axios({
                method: 'put',
                url: `http://localhost:3001/match/update/${id}`,
                data: {
                    localiza: {
                        id: 1,
                        name: localizaName,
                        year: localizaYear,
                        version: localizaVersion
                    },
                    movida: {
                        id: 1,
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
                            <button type="button" onClick={() => deleteItem(record._id)} className="btn btn-outline-danger"> Remover </button>
                            <button onClick={(e)=>setaEdit(record._id)} className="btn btn-outline-warning">  Editar </button>
                            
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
                                        <select className="form-control" onChange={(e) => setLocalizaYear(e.target.value)}  >
                                            <option value = "">Selecione</option>
                                            {localizaCars.map(car => <option value= {car.year} key ={car.id}> {car.year}</option>)}
                                        </select>
                                    </div>
                                    <div className ="version">
                                        <span>VERSÃO</span>
                                        <select className="form-control" onChange={(e) => setLocalizaVersion(e.target.value)} >
                                            <option value = "">Selecione</option>
                                            {localizaCars.map(car => <option value= {car.version} key ={car.id}> {car.version}</option>)}
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
                                    <select className="form-control"onChange={(e) => setMovidaYear(e.target.value)} >
                                        <option value = "">Selecione</option>
                                        {movidaCars.map(car => <option value= {car.year} key ={car.id}> {car.year}</option>)}
                                    </select>
                                </div>
                                <div className ="version">
                                    <span>VERSÃO</span>
                                    <select className="form-control" onChange={(e) => setMovidaVersion(e.target.value)}>
                                        <option value = "">Selecione</option>
                                        {movidaCars.map(car => <option value= {car.version} key ={car.id}> {car.version}</option>)}
                                    </select>
                                </div>
                                <button type="button" className="btn btn-outline-primary" onClick={(e) => {updateMatch(record._id)}}> Salvar</button>
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

        <h1>MATCHS</h1>
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

