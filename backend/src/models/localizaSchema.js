const mongoose = require('mongoose');


const LocalizaSchema = new mongoose.Schema({
    idbase: String,
    name: String,
    year: String,
    version: String
})

module.exports = mongoose.model("Localiza", LocalizaSchema, 'localiza-collection')