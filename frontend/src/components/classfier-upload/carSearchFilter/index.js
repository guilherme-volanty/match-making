import React, {useState, useEffect} from 'react';
import Api from '../../../services/databasesApi';
import './styles.css';
import {Button, Modal} from 'react-bootstrap';
import FilterTable from 'react-filterable-table';
import LoadingComponent from '../../misc/loading/index'




const Filter = () => {
    const [cars, setCars] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const loadAllCars = async () => {
            const cars = await Api.getClassfier();
            setCars(cars.data)
            setLoading(true);
        };

        loadAllCars();
    }, [])

    const fields = [
        {name: 'brand', displayName: "Marca", inputFilterable: true, exactFilterable: true, sortable: true},
        {name: 'model', displayName: "Modelo", inputFilterable: true, exactFilterable: true, sortable: true},
        {name: 'factoryYear', displayName: "Ano de Fabricação", inputFilterable: true, exactFilterable: true, sortable: true},
        {name: 'modelYear', displayName: "Ano do Modelo", inputFilterable: true, exactFilterable: true, sortable: true},
        {name: 'versionFipe', displayName: "Versão Fipe", inputFilterable: true, exactFilterable: true, sortable: true},
        {name: 'versionWebMotors', displayName: "Versão Webmotors", inputFilterable: true, exactFilterable: true, sortable: true},
        {name: 'versionLocaliza', displayName: "Versão Localiza", inputFilterable: true, exactFilterable: true, sortable: true}
    ]

    async function deleteMetadata() {
        await Api.deletMetadata()
    }

    function delteAction() {
        deleteMetadata();
        handleClose();
    }
    return (
        <>
            <section className="card-section">
                <div className="card mb-3-base-filter">
                    <div className="card-body text-dark">
                        <div className="title-header">
                            <h5 className="card-title">Classificador</h5>
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
                            {loading ?
                                <FilterTable
                                    className="filter-table-base"
                                    namespace="Classificador Volanty"
                                    initialSort="brand"
                                    data={cars}
                                    fields={fields}
                                    noRecordsMessage="Houve um problema com a visualização dos dados"
                                    noFilteredRecordsMessage="Nenhum carro encontrado!"
                                />
                                :
                                <LoadingComponent/>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )};

export default Filter;