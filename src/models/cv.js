const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cvSchema = new Schema({
   path : String,
   filename : String,
   originalname : String,
   student: {
    type:Schema.Types.ObjectId,
    ref:'alumni',
    required:true
    }
});

const Cv = mongoose.model('cv', cvSchema);

module.exports = Cv;