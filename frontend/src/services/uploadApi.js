import axios from 'axios';


const uploadApi = axios.create({
    baseURL: 'http://localhost:4000'
});


export default uploadApi;