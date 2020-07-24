const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const languageSchema = new Schema({
    language: String, 
    rate: Number,
    student: {
        type:Schema.Types.ObjectId,
        ref:'alumni'
    }
});

const Language = mongoose.model('language', languageSchema);
module.exports = Language;