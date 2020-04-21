const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    operationId: Number,
    createDate: Date,
    updateDate: Date,
    mockId:Number,
    webmotors: {
        id: Number,
        brand: String,
        model:String,
        bodywork: String,
        modelYear: Number,
        version:String
    },
    localiza: {
        id:Number,
        name:String,
        year: Number,
        version: String
    },
    movida: {
        id:Number,
        name:String,
        year: Number,
        version: String
    },
    user:{
        userId: Number,
        name:String,
        email:String
    }
});

module.exports = mongoose.model("Match", MatchSchema);