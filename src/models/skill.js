const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    skill: String, 
    rate: Number,
    student: {
        type:Schema.Types.ObjectId,
        ref:'alumni'
    }
});

const Skill = mongoose.model('skill', skillSchema);
module.exports = Skill;