const mongoose = require('mongoose');

function connectToMongo() {
  mongoose
    .connect('mongodb://localhost:27017/techtop',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
      }
    )
    .then(function() {
      console.log("CONECTADO AO BANCO DE DADOS");
    })
    .catch(function(err) {
      console.error(err);
    });
}

module.exports = connectToMongo;