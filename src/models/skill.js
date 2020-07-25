const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    skill: { type: String, required: true}, 
    rate: { type: String, required: true, default:null},
    student: {
        type:Schema.Types.ObjectId,
        ref:'alumni',
        required:true
    }
});

const Skill = mongoose.model('skill', skillSchema);
module.exports = Skill;