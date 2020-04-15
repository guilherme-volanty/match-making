var express = require('express')
	, app = express()
	, multer = require('multer')
	, multerConfigs = require('./multer')
	, routes = require('express').Router()
	, connectToMongo = require('./mongo')
	, Controller = require('./controller')
	, bodyParser= require('body-parser')
var cors = require('cors');
	


app.use(express.static('public/index.html'));
app.use(bodyParser.json());
app.use(routes);
app.use(cors());


connectToMongo();

routes.get('/status', (request, response) => {
    return response.status(200).send('Rota tá ok!')  
  });

routes.post('/file/upload', multer(multerConfigs).single('file'),Controller.saveDataFromUpload);

routes.get('/file/get',cors(), Controller.getAllMatchFiles);

routes.get('/file/:name ', Controller.getCarByName);

routes.delete('/file/delete', Controller.Delete);




app.listen(4000, () => console.log('App na porta 4000'));