import React, { useState } from 'react';
import './styles.css';
import uploadApi from '../../services/uploadApi';
import { Button, Modal } from 'react-bootstrap';


const SearchCard = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function renderBaseObjects() {


        uploadApi.get('/base-csv')
    }

    async function dropColletion(){
        await uploadApi.delete('/base-csv')
    }

    return (
        <section className="card-section">
            <div className="card-columns">
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="card-title">
                            <h2 id="Base-title" className="card-title">Base Webmotors</h2>
                            <Button variant="danger" onClick={handleShow}>
                                Deletar Base
                            </Button>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Deletar Base</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Você tem certeza que deseja deletar a base? Essa ação poderá acarretar erros inesperados!!</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Sair
                                    </Button>
                                    <Button variant="danger" onClick={handleClose, dropColletion}>
                                        Deletar Base
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>




                    </div>
                </div>
            </div>
        </section>
    );
}

export default SearchCard;
