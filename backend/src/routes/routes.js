const routes = require('express').Router();
const multer = require('multer');
const multerConfigs = require('../config/multer');
const jsonParser = require('../services/jsonParser');

routes.get('/status', (request, response) => {
    return response.status(200).send('Rota ok!')  
  });


routes.post('/base-upload', multer(multerConfigs).single('file'), (request, response) =>{
  console.log(request.file);
  jsonParser(request.file.filename);
  return response.status(200).send('Arquivo CSV recebido! Processando')
})


routes.post('/upload-test', (request,response) =>{
    console.log(request.body);
    return response.status(200).send('Chegou')
})
  
module.exports = routes;