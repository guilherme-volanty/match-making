const mongoose = require('mongoose');

const MetaDataSchema = new mongoose.Schema({
    fileName: String,
    createDate: Date,
    updateDate: Date,
    deletedDate: Date,
    isDeleted: Boolean,
    isActive: Boolean
});

module.exports = mongoose.model('MetaData', MetaDataSchema, "base-csv-metadata")