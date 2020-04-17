import React from 'react';
import Api from '../../API';
import {Table, Form} from 'react-bootstrap';
import Filter from '../filter/index';


const TableCRUD = ()=>{
    

return(
    
    <section className="tablecard-section">
        <div className="tablecard-columns">
            <div className="tablecard mb-3">
                <div className="tablecard-body">
                    <Form>
                        <Table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Ano</th>
                        <th scope="col">Versão</th>
                        <th scope="col">Origem</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        </tr>
                    </tbody>
                    </Table>
                    </Form>
                </div>
            </div>
        </div>
    </section>

)
};
export default TableCRUD;

