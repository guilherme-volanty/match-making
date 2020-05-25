import React, {useState} from 'react';
import './styles.css';
import Api from '../../../services/databasesApi';
import { Button, Form, FormLabel, FormControl, Modal } from 'react-bootstrap';
import FormFileInput from 'react-bootstrap/FormFileInput';
import FormFileLabel from 'react-bootstrap/FormFileLabel';

const UploadCard = () => {
    const [fileUpload, setFileUpload] = useState([]);
    const [fileName, setFileName] = useState('Procure sua Base');
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        setFileUpload([]);
        setFileName('Procure sua Base');
    };
    const handleShow = () => setShow(true);

    function onChange(e){
        setFileUpload(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    async function onSubmit(e){
        e.preventDefault();
        const formData = new FormData;
        formData.append('file', fileUpload);

        // Refatorar: inserir o método post no API services
        try{
            await Api.uploadApi.post('/classfier-csv', formData, {
                headers: {
                    'Content-Type': 'multipart/form'
                }
            });
            console.log('Arquivo enviado')
            setFileUpload([]);
            setFileName('Procure sua Base');
        } catch(err){
            console.log(err);
        }
    }

    return (
        <section className="card-section">
            <div className="column-card-upload">
                <div className="card mb-3-upload">
                    <div className="card-body">
                        <h2 id="Base-title" className="card-title">Classificador</h2>
                        <div>
                            <Form onSubmit={onSubmit}>
                                <FormFileInput type="file" className="custom-file-input" id="customFile" onChange={onChange}></FormFileInput>
                                <FormFileLabel className="custom-file-label" htmlFor="customFile">{fileName}</FormFileLabel>
                                <FormLabel>Base</FormLabel>
                                <FormControl as="select">
                                    <option>Classificador</option>
                                </FormControl>
                                <Button type="submit"onSubmit={onSubmit} onClick={handleShow}>Enviar</Button>
                                    <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Dados Enviados!</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Seu arquivo foi enviado para o banco de dados e em breve estará disponível para consulta</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" onClick={handleClose}>
                                            Ok!
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UploadCard;
