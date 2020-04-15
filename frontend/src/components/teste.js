import React from 'react';
import Api from '../API';

const TESTE = ()=>{
    try{
        Api.get('/file/get')
            .then(res=>{
                console.log(res.data);
            });

    } 
    
    catch(err){
        console.log(err);
    }

    return(
        <h1>uahsdhaushduas</h1>
    )
}
export default TESTE;

