const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;



const fileSchema = new Schema({
    
    name: String,
    image: String,
    year: Number,
    origin: String,
    href: String,
    version: String,
    // version: {type:String, unique:true},
    metadataID: ""

});


// fileSchema.plugin(uniqueValidator);


module.exports = mongoose.model('matchFile', fileSchema, 'matchfiles')

// var database = mongoose.model('matchfiles');

// database.find({}, function(err, data) { console.log(data); });
