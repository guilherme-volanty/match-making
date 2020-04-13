import axios from 'axios';


const uploadApi = axios.create({
    baseURL: 'http://localhost:3000'
});


export default uploadApi;