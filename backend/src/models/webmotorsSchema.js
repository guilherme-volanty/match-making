const mongoose = require('mongoose');

const webmotorsSchema = new mongoose.Schema({
    webmotorsId: String,
    brand: String,
    model: String,
    modelYear: Number,
    manufactoryYear: Number,
    version: String
});

module.exports = mongoose.model("Webmotors", webmotorsSchema, 'webmotors-collection')