import React from 'react';
import './styles.css';
import { Button, Form, FormFile } from 'react-bootstrap';

const Carde = () => {

    return (
        <section className="card">
            <div className="card-columns">
                <div className="card mb-3">
                    <div className="card-body">
                        <h2 id="Base-title" className="card-title">Base Root</h2>
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
                                            <option>Webmotors</option>
                                        </Form.Control>
                                    </div>

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