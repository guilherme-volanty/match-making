import React, {useState} from 'react';
import './styles.css';
import uploadApi from '../../services/uploadApi';
import { Button, Form, FormLabel, FormControl } from 'react-bootstrap';
import FormFileInput from 'react-bootstrap/FormFileInput';
import FormFileLabel from 'react-bootstrap/FormFileLabel';



const UploadCard = () => {
    const [fileUpload, setFileUpload] = useState('');
    const [fileName, setFileName] = useState('Procure sua Base');

    function onChange(e){
        setFileUpload(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    async function onSubmit(e){
        e.preventDefault();
        const formData = new FormData;
        formData.append('file', fileUpload);

        try{
            await uploadApi.post('/base-csv', formData, {
                headers: {
                    'Content-Type': 'multipart/form'
                }
            });
            console.log('Arquivo enviado')

            setFileUpload('');
            setFileName('Procure sua Base');

        } catch(err){
            console.log(err);
        }
    }


    return (
        <section className="card-section">
            <div className="column-card">
                <div className="card mb-3">
                    <div className="card-body">
                        <h2 id="Base-title" className="card-title">Base Root</h2>
                        <div>
                            <Form onSubmit={onSubmit}>
                                <FormFileInput type="file" className="custom-file-input" id="customFile" onChange={onChange}></FormFileInput>
                                <FormFileLabel className="custom-file-label" htmlFor="customFile">{fileName}</FormFileLabel>
                                <FormLabel>Base</FormLabel>
                                <FormControl as="select">
                                    <option>Webmotors</option>
                                </FormControl>
                                <Button type="submit"onSubmit={onSubmit}>Enviar</Button>
                            </Form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UploadCard;
