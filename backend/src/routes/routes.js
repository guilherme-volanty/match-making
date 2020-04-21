 
const routes = require('express').Router();
const multer = require('multer');
const multerConfigs = require('../config/multer');
const jsonParser = require('../services/jsonParser');
const baseCsvController = require('../controller/baseCsvController')

routes.get('/base-csv', baseCsvController.indexMetadata);
routes.get('/base-cars', baseCsvController.indexCarEntries);
routes.get('/base-cars-list/brands', baseCsvController.listBrands);
routes.get(`/base-cars-list/brands/:brandsId/models`, baseCsvController.listModels);
routes.get('/base-cars-list/brands/:brandsId/models/:models/years', baseCsvController.listModelYear);
routes.get('/base-cars-list/brands/:brandsId/models/:models/years/:year/version', baseCsvController.listVersions);
// routes.get('/base-cars-list/brands/:brandsId/models/:models/years/:year/version/:versionId', baseCsvController);


routes.post('/base-csv', multer(multerConfigs).single('file'), (request, response) =>{
  console.log(request.file);
  jsonParser(request.file.filename);

  return response.status(200).send('Arquivo CSV recebido! Processando')
})

routes.delete('/base-csv', baseCsvController.delete)
module.exports = routes;