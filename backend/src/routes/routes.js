const routes = require('express').Router();
const multer = require('multer');
const multerConfigs = require('../config/multer');
const jsonParser = require('../services/jsonParser');
const baseCsvController = require('../controller/baseCsvController')

routes.get('/status', (request, response) => {
    return response.status(200).send('Rota ok!')  
  });


routes.post('/base-upload', multer(multerConfigs).single('file'), (request, response) =>{
  console.log(request.file);
  jsonParser(request.file.filename);
  return response.status(200).send('Arquivo CSV recebido! Processando')
})


routes.post('/upload-test', baseCsvController.store);

  
module.exports = routes;