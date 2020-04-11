 
const routes = require('express').Router();
const multer = require('multer');
const multerConfigs = require('../config/multer');
const jsonParser = require('../services/jsonParser');
const baseCsvController = require('../controller/baseCsvController')

routes.get('/base-csv', baseCsvController.index);


routes.post('/base-csv', multer(multerConfigs).single('file'), (request, response) =>{
  console.log(request.file);
  jsonParser(request.file.filename);

  return response.status(200).send('Arquivo CSV recebido! Processando')
})

module.exports = routes;