const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    media: String, 
    url: String,
    student: {
        type:Schema.Types.ObjectId,
        ref:'alumni'
    }
});

const Media = mongoose.model('language', mediaSchema);
module.exports = Media; 