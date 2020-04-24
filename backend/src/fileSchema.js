const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const fileSchema = new Schema({
    
    name: String,
    image: String,
    year: Number,
    origin: String,
    href: String,
    version: String,
    version: {type:String},
    metadataID: ""

});


module.exports = mongoose.model('matchFile', fileSchema)


