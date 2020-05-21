const mongoose = require('mongoose');

const fipeSchema = new mongoose.Schema({
    fipeId: String,
    brand: String,
    model: String,
    year: Number,
    version: String
});

module.exports = mongoose.model("Fipe", fipeSchema, 'fipe-collection')