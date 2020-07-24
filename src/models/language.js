const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const languageSchema = new Schema({
    language: { type: String, required: true},
    rate: { type: String, required: true, default: null},
    student: {
        type:Schema.Types.ObjectId,
        ref:'alumni',
        required:true
    }
});

const Language = mongoose.model('language', languageSchema);
module.exports = Language;