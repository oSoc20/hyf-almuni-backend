const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  hash: String,
  salt: String,
  registeredDate: { type: Date, default: Date.now },
  userType: { type: String, default:'company' },
})

const Company = mongoose.model('company', companySchema);

module.exports = Company;
