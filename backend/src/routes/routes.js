const routes = require('express').Router();
const multer = require('multer');
const multerConfigs = require('../config/multer');
const classifierParser = require('../services/classifierParser');
const localizaParser = require('../services/localizaParser');
const fipeParser = require('../services/fipeParser');
const webmotorsParser = require('../services/webmotorsParser');
const classifierController = require('../controller/classifierController');
const fipeController = require('../controller/fipeController');
const webmotorsController = require('../controller/webmotorsController');
const localizaController = require('../controller/localizaController');


//Rotas do Classificador
routes.get('/databases/classifier/classifier-data', classifierController.classfierData);
routes.get('/databases/classifier/list/brands', classifierController.listBrands);
routes.get(`/databases/classifier/list/brands/:brandsId/models`, classifierController.listModels);
routes.get('/databases/classifier/list/brands/:brandsId/models/:models/years', classifierController.listModelYear);
routes.get('/databases/classifier/list/brands/:brandsId/models/:models/years/:year/version', classifierController.listVersions);
routes.get('/databases/classifier/list/brands/:brandsId/models/:models/years/:year/version/:versionId', classifierController.listUniqueCar);

routes.post('/databases/classfier-csv', multer(multerConfigs).single('file'), (request, response) =>{
  console.log(request.file);
  classifierParser(request.file.filename);
  return response.status(200).send('Arquivo CSV recebido! Processando')
});


//Rotas da Fipe
routes.get('/databases/fipe/classfier-data', fipeController.fipeData);
routes.get('/databases/fipe/list/brands', fipeController.listBrands);
routes.get('/databases/fipe/list/brands/:brandsId/models', fipeController.listModels);
routes.get('/databases/fipe/list/brands/:brandsId/models/:models/years', fipeController.listModelYear);
routes.get('/databases/fipe/list/brands/:brandsId/models/:models/years/:year/version', fipeController.listVersions);
routes.get('/databases/fipe/list/brands/:brandsId/models/:models/years/:year/version/:versionId', fipeController.listUniqueCar);

routes.post('/databases/fipe-csv', multer(multerConfigs).single('file'), (request, response) =>{
  console.log(request.file);
  fipeParser(request.file.filename);
  return response.status(200).send('CSV da Tabela Fipe recebido! Processando')
});


//Rotas da Webmotors
routes.get('/databases/webmotors/webmotors-data', webmotorsController.webmotorsData);
routes.get('/databases/webmotors/list/brands', webmotorsController.listBrands);
routes.get('/databases/webmotors/list/brands/:brandsId/models', webmotorsController.listModels);
routes.get('/databases/webmotors/list/brands/:brandsId/models/:models/years', webmotorsController.listModelYear);
routes.get('/databases/webmotors/list/brands/:brandsId/models/:models/years/:year/version', webmotorsController.listVersions);
routes.get('/databases/webmotors/list/brands/:brandsId/models/:models/years/:year/version/:versionId', webmotorsController.listUniqueCar);

routes.post('/databases/webmotors-csv', multer(multerConfigs).single('file'), (request, response) =>{
  console.log(request.file);
  webmotorsParser(request.file.filename);
  return response.status(200).send('CSV da Webmotors recebido! Processando')
});

//Rotas da Localiza
routes.get('/databases/localiza/localiza-data', localizaController.localizaData);
routes.get('/databases/localiza/list/names', localizaController.listNames);
routes.get('/databases/localiza/list/names/:nameId/year', localizaController.listYear);
routes.get('/databases/localiza/list/names/:nameId/years/:years/version', localizaController.listVersions);
routes.get('/databases/localiza/list/names/:nameId/models/:models/years/:year/version/:versionId', localizaController.listUniqueCar);

routes.post('/databases/localiza-csv', multer(multerConfigs).single('file'), (request, response) =>{
  console.log(request.file);
  localizaParser(request.file.filename);
  return response.status(200).send('CSV da Localiza recebido! Processando')
});


module.exports = routes;