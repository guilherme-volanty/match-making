const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    
    name: String,
    image: String,
    year: Number,
    origin: String,
    meanPrice: Number,
    href: String,
    version: String,



});

module.exports = mongoose.model('matchFile', fileSchema)