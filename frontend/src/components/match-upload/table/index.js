import React, { useState , useEffect } from 'react';
import Api from '../../../services/match-upload-API';
import './styles.css';
import {Button, Form, Modal, Table} from 'react-bootstrap';
import FilterTable from 'react-filterable-table';


const FilterTableCRUD = () => {

    const [movida, setMovida] = useState([]);
    const [localiza, setLocaliza] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
        const loadMovida = async () =>{
            
            Api.get('/origins/MOVIDA/files')
            .then(res => {
                setMovida(res.data)
            })
            .catch(err =>{
                console.log(err)
            })
            
        };

        loadMovida();
    }, [])

    useEffect(() => {
        const loadLocaliza = async () =>{
            
            Api.get('/origins/LOCALIZA/files')
            .then(res => {
                setLocaliza(res.data)
            })
            .catch(err =>{
                console.log(err)
            })
            
        };

        loadLocaliza();
    }, [])

    
    const dataCar=[];

    const dataCar1=movida;
    const dataCar2=localiza;

    dataCar1.map(car=>dataCar.push(car));
    dataCar2.map(car=>dataCar.push(car));

    const fields = [
        {name: 'name', displayName: "Nome", inputFilterable: true, exactFilterable: true, sortable: true },
        {name: 'year', displayName: "Ano", inputFilterable: true, exactFilterable: true, sortable: true },
        {name: 'version', displayName: "Versão", inputFilterable: true, exactFilterable: true, sortable: true },
        {name: 'origin', displayName: "Origem", inputFilterable: true, exactFilterable: true, sortable: true }
    ]

    

    function deleteAction(){
        
        Api.post('/file/deleter')
            .then(res => {
                console.log("BASE DELETADA")
            })
            .catch(err =>{
                console.log(err)
            })
        handleClose();
    }
return (
<>  
    <section className="card-section">
        <div className="card mb-3" >
            <div className="card-body text-dark">  
                <div className="title-header">
                <h5 className="card-title">Base de Match</h5>
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
                                    <Button variant="danger" onClick={deleteAction}>
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

export default FilterTableCRUD;