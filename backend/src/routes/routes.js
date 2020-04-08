const routes = require('express').Router();


routes.get('/status', (request, response) => {
    return response.status(200).send('Rota ok!')  
  });

  
module.exports = routes  