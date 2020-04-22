const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    operationId: Number,
    createDate: Date,
    updateDate: Date,
    mockId:Number,
    webmotors: {
        id: String,
        brand: String,
        model:String,
        bodywork: String,
        modelYear: Number,
        version:String
    },
    localiza: {
        id:String,
        name:String,
        year: Number,
        version: String
    },
    movida: {
        id:String,
        name:String,
        year: Number,
        version: String
    },
    user:{
        userId: String,
        name:String,
        email:String
    }
});

module.exports = mongoose.model("Match", MatchSchema);
