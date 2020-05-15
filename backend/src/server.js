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

routes.get('/databases/status', (request, response) => {
    return response.status(200).send('Rota tá ok!')  
  });

routes.post('/databases/file/upload', multer(multerConfigs).single('file'),Controller.saveDataFromUpload);

routes.get('/databases/file/getter', Controller.getAllMatchFiles);

routes.get('/databases/names', Controller.listNames);

routes.get('/databases/names/:name/years', Controller.listYears);

routes.get('/databases/names/:name/years/:year/versions', Controller.listVersions);

routes.get('/databases/names/:name/years/:year/versions/:version/origins', Controller.listOrigins);

routes.get('/databases/origins/MOVIDA/files', Controller.filterByOriginMovida);

routes.get('/databases/origins/LOCALIZA/files', Controller.filterByOriginLocaliza);

routes.post('/databases/file/deleter', Controller.Delete);

routes.delete('/databases/file/remove', Controller.Remove);




app.listen(process.env.PORT||4000);