import axios from 'axios';

const databasesApi = axios.create({
    baseURL: 'http://localhost:4002/databases'
});

const getClassfier = async() => {
    const response = await databasesApi.get('/classifier/classifier-data');
    return response
}

const getFipeVersion = async(brandsId, models, year) =>{
    const response = await databasesApi.get(`/fipe/list/brands/${brandsId}/models/${models}/years/${year}/version`)
    return response
}

const getWebmotorsVersion = async(brandsId, models, year) =>{
    const response = await databasesApi.get(`/webmotors/list/brands/${brandsId}/models/${models}/years/${year}/version`)
    return response
}

const deletMetadata = async () =>{
    return await databasesApi.delete('/base-csv')
}

const Api = {
    getClassfier,
    getFipeVersion,
    getWebmotorsVersion,
    databasesApi,
    deletMetadata
}

export default Api;