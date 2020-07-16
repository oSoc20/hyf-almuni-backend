const mongoose = require('mongoose');

const  alumniSchema= new mongoose.Schema({
  firstName: {
    type: String,
    required: true 
  },
  lastName: {
    type: String,
    required: true 
  }
});

module.exports = mongoose.model('alumni', alumniSchema);
