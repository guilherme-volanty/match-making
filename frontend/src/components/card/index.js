import React from 'react';
import './styles.css';
import { Button, Form, FormFile } from 'react-bootstrap';

function postUpload(){

    return axios.post('http://localhost:4000/file/upload')
    .then(function(response){
      console.log('salvo com sucesso')
    });  
}

const Carde = () => {

    return (
        <section className="card-section">
            <div className="card-columns">
                <div className="card mb-3">
                    <div className="card-body">
                        <h2 id="Base-title" className="card-title">Base Match</h2>
                        <div>
                            <FormFile action='file/upload' method='post' encType='multipart/form-data'>
                                <Form.Group className="card-options" controlId="baseUpload">
                                    <div className="select-container">
                                        <Form.Label>Envie sua Base</Form.Label>
                                        <Button className="find-csv" variant="outline-warning">Procurar CSV</Button>
                                    </div>
                                    <div className="select-container">
                                        <Form.Label>Base</Form.Label>
                                        <Form.Control className="base-select" as="select" size="sm" custom>
                                            <option>Movida</option>
                                            <option>Localiza</option>
                                        </Form.Control>
                                    </div>
                                    <Button className="send" onClick={postUpload}>ENVIAR</Button>
                                </Form.Group>
                            </FormFile >
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Carde;