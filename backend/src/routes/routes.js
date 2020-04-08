const routes = require('express').Router();
const multer = require('multer');
const multerConfigs = require('../config/multer')

routes.get('/status', (request, response) => {
    return response.status(200).send('Rota ok!')  
  });


routes.post('/base-upload', multer(multerConfigs).single('file'), (request, response) =>{
  console.log(request.file);

  return response.status(200).send('Arquivo CSV recebido')
})
  
module.exports = routes  