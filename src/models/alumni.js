const mongoose = require('mongoose');

const  alumniSchema= new mongoose.Schema({
  name: {
    type: String,
    required: true 
  },
  surname: {
    type: String,
    required: true 
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hash: String,
  salt: String
});

module.exports = mongoose.model('Alumni', alumniSchema);
