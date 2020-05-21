const routes = require('express').Router();
const multer = require('multer');
const multerConfigs = require('../config/multer');
const classifierParser = require('../services/classifierParser');
const localizaParser = require('../services/localizaParser');
const fipeParser = require('../services/fipeParser');
const webmotorsParser = require('../services/webmotorsParser');
const classifierController = require('../controller/classifierController');


routes.get('/classifier/classfier-data', classifierController.classfierData);
routes.get('/classifier/base-cars-list/brands', classifierController.listBrands);
routes.get(`/classifier/base-cars-list/brands/:brandsId/models`, classifierController.listModels);
routes.get('/classifier/base-cars-list/brands/:brandsId/models/:models/years', classifierController.listModelYear);
routes.get('/classifier/base-cars-list/brands/:brandsId/models/:models/years/:year/version', classifierController.listVersions);
routes.get('/classifier/base-cars-list/brands/:brandsId/models/:models/years/:year/version/:versionId', classifierController.listUniqueCar);


routes.post('/webmotors-csv', multer(multerConfigs).single('file'), (request, response) =>{
  console.log(request.file);
  webmotorsParser(request.file.filename);

  return response.status(200).send('CSV da Webmotors recebido! Processando')
});

routes.post('/localiza-csv', multer(multerConfigs).single('file'), (request, response) =>{
  console.log(request.file);
  localizaParser(request.file.filename);

  return response.status(200).send('CSV da Localiza recebido! Processando')
});

routes.post('/fipe-csv', multer(multerConfigs).single('file'), (request, response) =>{
  console.log(request.file);
  fipeParser(request.file.filename);

  return response.status(200).send('CSV da Tabela Fipe recebido! Processando')
});

routes.post('/classfier-csv', multer(multerConfigs).single('file'), (request, response) =>{
  console.log(request.file);
  classifierParser(request.file.filename);

  return response.status(200).send('Arquivo CSV recebido! Processando')
});

module.exports = routes;