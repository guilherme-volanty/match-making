const mongoose = require('mongoose');

function dbConnect(){
    mongoose.connect('mongodb+srv://car-match:car-match@cluster0-tnam3.mongodb.net/test-uploads?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(function() {
        console.log("Conectado com o MongoDB")
    }).catch(err => {
        return err;
    })
} 

module.exports = dbConnect;


