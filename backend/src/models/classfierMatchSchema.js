const mongoose = require('mongoose');

const ClassifierSchema = new mongoose.Schema({
    brand: String,
    model: String,
    versionFipe: String,
    versionWebMotors: String,
    versionLocaliza: String,
    factoryYear: Number,
    modelYear: Number,
    fipeId: String,
    webmotorsId: String,
    localizaId: String,
});

module.exports = mongoose.model("ClassifierData", ClassifierSchema, "classifier-data")