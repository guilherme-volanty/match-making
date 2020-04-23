import axios from "axios";

const Api = axios.create({
    baseURL: 'https://upload-match-csvs.herokuapp.com/'
  });

export default Api;