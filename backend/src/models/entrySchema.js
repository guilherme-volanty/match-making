const mongoose = require('mongoose');
const MetaData = require('./metadataSchema');

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
    metadataId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Metadata'
    }
});

module.exports = mongoose.model("EntriesData", EntrySchema, "base-entries-data")