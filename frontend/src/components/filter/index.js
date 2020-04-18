import React, { useState , useEffect} from 'react';
import Api from '../../API';
import './styles.css';
import {Table, Form} from 'react-bootstrap';


const Filter = (props) => {

    const [cars, setCars] = useState([]);
    const [name, setName] = useState("");
    const [year, setYear] = useState(0);
    const [version, setVersion] = useState("");
    const [origin, setOrigin] = useState("");

    useEffect(() => {
        Api.get('/file/get')
            .then(res => {
                setCars(res.data)
            })
            .catch(err =>{
                console.log(err)
            })
    }, [])

        

    const onChangeName = (event) => {
        setName(event.target.value)
    
    }    

    const onChangeYear = (event) => {
        setYear(Number(event.target.value))
        
    }

    const onChangeVersion = (event) => {
        setVersion(event.target.value)
    
    }
    const onChangeOrigin = (event) => {
        setOrigin(event.target.value)
    
    }
    const getCars = () =>{
        return cars
    }
    
    
    
return (
<>  
    <section>
        <div className="card mb-3" style={{height: "500px", marginTop: "10px", width: '350px'}}>
            <div className="card-body text-dark">  
                <h5 className="card-title title">{props.origin}</h5>
                <div className="card-text">
                    <div className="selects">
                        <div className="row-selects">
                            <div className="select1 form-group">
                                <label htmlFor="nome">Nome</label>
                                <select className="form-control" onChange={onChangeName}>
                                        <option value = "">Selecione</option>
                                        {cars.map(car => <option value= {car.name} key ={car.id}> {car.name}</option>)}
                                </select>
                            </div>
                            <div className="select2 form-group">
                                <label htmlFor="nome">Ano</label>
                                <select className="form-control" onChange={onChangeYear}>
                                    <option value = "">-</option>
                                        {cars.filter(filter =>filter.name===name)
                                            .map(car => <option value= {car.year}key ={car.id}>{car.year}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <div className="select3 form-group">
                                <label htmlFor="nome">Versão</label>
                                <select className="form-control" onChange={onChangeVersion}>
                                    <option value = "">Selecione</option>
                                    {cars.filter(filter => filter.name===name&&filter.year===year)
                                    .map(car => <option value= {car.version} key ={car.id}>{car.version}</option>)}
                                </select>
                            </div>
                        </div>
                            <div className="select4 form-group">
                                <label htmlFor="nome">Origem</label>
                                <select className="form-control" onChange={onChangeOrigin}>
                                    <option value = "">Selecione</option>
                                    {cars.filter(filter =>filter.name===name&&filter.year===year&&filter.version===version)
                                    .map(car => <option value= {car.origin} key ={car.id}>{car.origin}</option>)}
                                </select>
                            </div>
                    </div> 
                </div>
            </div>
        </div>
    </section>

    <section className="tablecard-section">
        <div className="tablecard-columns">
            <div className="tablecard mb-3">
                <div className="tablecard-body">
                    <Form>
                        <Table class="table table-striped">
                    <thead>
                        <tr>
                        
                        <th scope="col">Nome</th>
                        <th scope="col">Ano</th>
                        <th scope="col">Versão</th>
                        <th scope="col">Origem</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {cars.filter(filter =>filter.name===name&&filter.year===year&&filter.version===version&&filter.origin===origin)
                        .map(car=>
                        <>
                        <tr>
                            <td>{car.name}</td>
                            <td>{car.year}</td>
                            <td>{car.version}</td>
                            <td>{car.origin}</td>
                        </tr>
                        </>)}
                    </tbody>
                    </Table>
                    </Form>
                </div>
            </div>
        </div>
    </section>
</>


)};
        

export default Filter;
