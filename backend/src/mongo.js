const mongoose = require('mongoose');

// mongodb+srv://car-match:car-match@cluster0-tnam3.mongodb.net/test?retryWrites=true&w=majority

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