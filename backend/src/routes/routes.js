 
const routes = require('express').Router();
const multer = require('multer');
const multerConfigs = require('../config/multer');
const jsonParser = require('../services/jsonParser');
const baseCsvController = require('../controller/baseCsvController')

routes.get('/base-csv', baseCsvController.indexMetadata);
routes.get('/base-cars', baseCsvController.indexCarEntries);
routes.get('/base-cars-list/', baseCsvController.indexCarList);


routes.post('/base-csv', multer(multerConfigs).single('file'), (request, response) =>{
  console.log(request.file);
  jsonParser(request.file.filename);

  return response.status(200).send('Arquivo CSV recebido! Processando')
})

routes.delete('/base-csv', baseCsvController.delete)
module.exports = routes;