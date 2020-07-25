const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    media: { type: String, required: true}, 
    url: { type: String, required: true},
    student: {
        type:Schema.Types.ObjectId,
        ref:'alumni',
        required:true
    }
});

const Media = mongoose.model('media', mediaSchema);
module.exports = Media; 