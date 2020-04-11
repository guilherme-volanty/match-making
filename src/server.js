const express = require('express')
	, app = express()
	, multer = require('multer')
	, multerConfigs = require('./multer')
	, routes = require('express').Router()
	, connectToMongo = require('./mongo')
	, Controller = require('./controller')
	, bodyParser= require('body-parser');
	


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(routes);


connectToMongo();

routes.get('/status', (request, response) => {
    return response.status(200).send('Rota tá ok!')  
  });

routes.post('/file/upload', multer(multerConfigs).single('file'),Controller.saveDataFromUpload);

routes.post('/file/post', Controller.createMatchFiles);

routes.get('/file/get', Controller.getAllMatchFiles);





app.listen(3000, () => console.log('App na porta 3000'));