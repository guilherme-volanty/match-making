var express = require('express')
	, app = express()
	, multer = require('multer')
	, multerConfigs = require('./multer')
	, routes = require('express').Router()
	, connectToMongo = require('./mongo')
	, Controller = require('./controller')
	
var cors = require('cors');
	

app.use(cors());
app.use(routes);
connectToMongo();
app.use(express.static('public/index.html'));

routes.get('/status', (request, response) => {
    return response.status(200).send('Rota tá ok!')  
  });

routes.post('/file/upload', multer(multerConfigs).single('file'),Controller.saveDataFromUpload);

routes.get('/file/getter', Controller.getAllMatchFiles);

routes.get('/names', Controller.listNames);

routes.get('/names/:name/years', Controller.listYears);

routes.get('/names/:name/years/:year/versions', Controller.listVersions);

routes.get('/names/:name/years/:year/versions/:version/origins', Controller.listOrigins);

routes.get('/origins/MOVIDA/files', Controller.filterByOriginMovida);

routes.get('/origins/LOCALIZA/files', Controller.filterByOriginLocaliza);

routes.post('/file/deleter', Controller.Delete);

routes.delete('/file/remove', Controller.Remove);




app.listen(process.env.PORT||4000);