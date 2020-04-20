import axios from 'axios';


const uploadApi = axios.create({
    baseURL: 'http://localhost:4002'
});

const getBrands = async () =>{
    const response = await uploadApi.get('/base-cars-list/?key=brand') ;
    return response 
};

const getModels = async () =>{
    const response = await uploadApi.get('/base-cars-list/?key=model');
    return response
};

const getYear = async () =>{
    const response = await uploadApi.get('/base-cars-list?key=modelYear');
    return response
};

const getBodyWork = async () =>{
    const response = await uploadApi.get('/base-cars-list/?key=bodyWork');
    return response
};

const getVersion = async () =>{
    const response = await uploadApi.get('/base-cars-list/?key=version');
    return response
};

const Api ={
    getBrands,
    getModels,
    getYear,
    getBodyWork,
    getVersion
}

export default Api;