const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profilePictureSchema = new Schema({
   path : String,
   filename : String,
   originalname : String,
   student: {
    type:Schema.Types.ObjectId,
    ref:'alumni',
    required:true
    }
});

const AlumniProfilePicture = mongoose.model('picture', profilePictureSchema);

module.exports = AlumniProfilePicture;