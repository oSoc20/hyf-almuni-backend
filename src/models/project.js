const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: String, 
    url: String,
    picture:String,
    student: {
        type:Schema.Types.ObjectId,
        ref:'alumni'
    }
});

const Project = mongoose.model('project', projectSchema);
module.exports = Project;