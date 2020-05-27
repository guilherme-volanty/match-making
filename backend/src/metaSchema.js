var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MetaSchema = new Schema({
    fileName: String,
    createDate: Date,
    updateDate: Date,
    deletedDate: Date,
    isDeleted: Boolean,
    isActive: Boolean
    
});

module.exports = mongoose.model('metaData', MetaSchema);