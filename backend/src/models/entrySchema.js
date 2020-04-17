const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
    fipePrice: Number,
    minPrice: Number,
    averagePrice: Number,
    maximumPrice: Number,
    brand: String,
    model: String,
    version: String,
    modelYear: Number,
    bodyWork: String,
    versionId: String,
    metadataId: String
});

module.exports = mongoose.model("EntriesData", EntrySchema, "entry-data")