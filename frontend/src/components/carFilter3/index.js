import React, { useState , useEffect } from 'react';
import Api from '../../services/uploadApi';
import './styles.css';
import {Button, Form, Modal, Table} from 'react-bootstrap';
import FilterTable from 'react-filterable-table';


const Filter3 = () => {
    const [cars, setCars] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
        const loadAllCars = async () =>{
            const cars = await Api.getAllCars();
            setCars(cars.data);
        };

        loadAllCars();
    }, [])
    
    const dataCar = cars;

    const fields = [
        {name: 'brand', displayName: "Marca", inputFilterable: true, exactFilterable: true, sortable: true },
        {name: 'model', displayName: "Modelo", inputFilterable: true, exactFilterable: true, sortable: true },
        {name: 'modelYear', displayName: "Ano", inputFilterable: true, exactFilterable: true, sortable: true },
        {name: 'version', displayName: "Versão", inputFilterable: true, exactFilterable: true, sortable: true }
    ]

    async function deleteMetadata(){
        await Api.deletMetadata()
    }

    function delteAction(){
        deleteMetadata();
        handleClose();
    }
return (
<>  
    <section className="card-section">
        <div className="card mb-3" >
            <div className="card-body text-dark">  
                <div className="title-header">
                <h5 className="card-title">Webmotoras</h5>
                <Button variant="danger" onClick={handleShow}>Deletar Base</Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Deletar Base</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Você tem certeza que deseja deletar a base? Essa ação poderá acarretar erros inesperados!!</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Sair
                                    </Button>
                                    <Button variant="danger" onClick={delteAction}>
                                        Deletar Base
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                </div>
                <div className="Filter">
                    <FilterTable
                        className="filter-table" 
                        namespace="Base Principal Volanty"
                        initialSort="brand"
                        data={dataCar}
                        fields={fields}
                        noRecordsMessage="Carregando Carros"
                        noFilteredRecordsMessage="Nenhum carro encontrado!"
                    />
                </div>   
            </div>
        </div>
    </section>
</>
)};        

export default Filter3;