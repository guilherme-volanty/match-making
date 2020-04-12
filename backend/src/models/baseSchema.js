const mongoose = require('mongoose');

const BaseSchema = new mongoose.Schema({
    fipePrice: Number,
    minPrice: Number,
    averagePrice: Number,
    maximumPrice: Number,
    brand: String,
    model: String,
    version: String,
    modelYear: Number,
    bodyWork: String,
    versionId: String
});

module.exports = mongoose.model('BaseCSV', BaseSchema, "base-csv-test")