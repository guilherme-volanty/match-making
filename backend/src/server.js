var express = require('express')
	, app = express()
	, multer = require('multer')
	, multerConfigs = require('./multer')
	, routes = require('express').Router()
	, connectToMongo = require('./mongo')
	, Controller = require('./controller')
	
var cors = require('cors');
	


app.use(express.static('public/index.html'));
app.use(routes);
app.use(cors());


connectToMongo();

routes.get('/status', (request, response) => {
    return response.status(200).send('Rota tá ok!')  
  });

routes.post('/file/upload', multer(multerConfigs).single('file'),Controller.saveDataFromUpload);

routes.get('/file/getter', cors(), Controller.getAllMatchFiles);

routes.get('/names',cors(), Controller.listNames);

routes.get('/names/:name/years', cors(), Controller.listYears);

routes.get('/names/:name/years/:year/versions', cors(),Controller.listVersions);

routes.get('/names/:name/years/:year/versions/:version/origins', cors(),Controller.listOrigins);

routes.get('/origins/:origin/files', cors(), Controller.filterByOrigin);

routes.post('/file/deleter', Controller.Delete);

routes.delete('/file/remove', Controller.Remove);




app.listen(process.env.PORT||4000);