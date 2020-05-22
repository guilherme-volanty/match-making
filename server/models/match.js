const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    createDate: Date,
    updateDate: Date,
    isVerified: false,
    totalCounts: 0,
    webmotors: {
        webmotorsId: String,
        brand: String,
        model:String,
        factoryYear: Number,
        modelYear: Number,
        version:String
    },
    localiza: {
        localizaId: String,
        brand: String,
        model:String,
        factoryYear: Number,
        modelYear: Number,
        version:String
    },
    fipe: {
        fipeId: String,
        brand: String,
        model:String,
        factoryYear: Number,
        modelYear: Number,
        version:String
    },
    user:[{
        userId: String,
        name:String,
        email:String
    }],
});

module.exports = mongoose.model("Match", MatchSchema);
