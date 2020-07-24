const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  alumniSchema= new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  hash: String,
  salt: String,
  cv:String,
  about: String,
  profileImage:String,
  userType: { type: String, default:'alumni' },
  isActive: { type: Boolean, default:true },
  registeredDate: { type: Date, required: true, default : Date.now },
  updatedDate: { type: Date },
  jobTitle: { type: String, enum : ['frontend','backend','fullstack', 'designer'], default: 'frontend' },
  languages: [{
    type:Schema.Types.ObjectId,
    ref:'language'
  }],
  skills: [{
    type:Schema.Types.ObjectId,
    ref:'skill'
  }],
  media: [{
    type:Schema.Types.ObjectId,
    ref:'media'
  }],
  projects: [{
    type:Schema.Types.ObjectId,
    ref:'project'
  }],

});

const Alumni = mongoose.model('alumni', alumniSchema);

module.exports = Alumni;