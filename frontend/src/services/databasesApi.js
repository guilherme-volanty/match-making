import axios from 'axios';

const databasesApi = axios.create({
    baseURL: 'https://d1qz6xp2lbl1xi.cloudfront.net/databases'
});

const getClassfier = async() => {
    const response = await databasesApi.get('/classifier/classifier-data');
    return response
}

const getFipeVersion = async(brandsId, models, modelYear) =>{
    const response = await databasesApi.get(`/fipe/list/brands/${brandsId}/models/${models}/modelYears/${modelYear}/version`)
    return response
}

const getWebmotorsVersion = async(brandsId, models, modelYear, manufactoryYear) =>{
    const response = await databasesApi.get(`/webmotors/list/brands/${brandsId}/models/${models}/modelYears/${modelYear}/manufactoryYears/${manufactoryYear}/version`)
    return response
}

const getFipeId = async(brandsId, models, modelYear, versionId) =>{
    const response = await databasesApi.get(`/fipe/list/brands/${brandsId}/models/${models}/modelYears/${modelYear}/version/${versionId}`)
    return response.data[0]
}

const getWebmotorsId = async(brandsId, models, modelYear, manufactoryYear, versionId) =>{
    const response = await databasesApi.get(`/webmotors/list/brands/${brandsId}/models/${models}/modelYears/${modelYear}/manufactoryYears/${manufactoryYear}/version/${versionId}`)
    return response.data[0]
}

const deletMetadata = async () =>{
    return await databasesApi.delete('/base-csv')
}

const Api = {
    getClassfier,
    getFipeVersion,
    getWebmotorsVersion,
    getFipeId,
    getWebmotorsId,
    databasesApi,
    deletMetadata
}

export default Api;