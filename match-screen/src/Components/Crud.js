import React, {useState, useEffect} from "react"; 
import axios from "axios";

const Crud = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/match/all")
            .then(res => {
                setData(res.data)
            })

    },[])

    
    const renderizaLinha = record => {
            return(
                <tr key = "record._id">
                    <th >{record.webmotors.brand} {record.webmotors.model} {record.webmotors.year} {record.webmotors.version}</th>
                        <td>{record.localiza.name} {record.localiza.year} {record.localiza.version}</td>
                        <td>{record.movida.name} {record.movida.year} {record.movida.version}</td>
                        <td>{record.user.name}</td>
                    <td>
                        <button type="button" className="btn btn-danger"> Remover </button>
                        <button  className="btn btn-warning">Editar</button>
                    </td>
                </tr>
            );



    }

    return(
        <div className = "table">
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

