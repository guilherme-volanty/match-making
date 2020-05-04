import axios from 'axios';


const uploadApi = axios.create({
    baseURL: 'http://ec2-34-206-3-99.compute-1.amazonaws.com:3000/'
});

const getAllCars = async () =>{
    const response = await uploadApi.get('/base-cars')
    return response
}

const getBrands = async () =>{
    const response = await uploadApi.get('/base-cars-list/brands') ;
    return response 
};

const getModels = async (brandsId) =>{
    const response = await uploadApi.get(`/base-cars-list/brands/${brandsId}/models`);
    return response
};

const getModelYear = async (brandsId, models) =>{
    const response = await uploadApi.get(`/base-cars-list/brands/${brandsId}/models/${models}/years`);
    return response
};

const getVersion = async (brandsId, models, year) =>{
    const response = await uploadApi.get(`/base-cars-list/brands/${brandsId}/models/${models}/years/${year}/version`);
    return response
};

const deletMetadata = async () =>{
    return await uploadApi.delete('/base-csv')
}

const Api ={
    getAllCars,
    getBrands,
    getModels,
    getModelYear,
    getVersion,
    uploadApi,
    deletMetadata
}

export default Api;