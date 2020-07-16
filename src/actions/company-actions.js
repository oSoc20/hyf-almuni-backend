const Company = require('../models/company');

const getCompany = async (req, res) => {
  try {
    const company = await Company.find();
    res.json(company)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
};

const createCompany= async (req, res) => {
  const company = new Company({
    name: req.body.name
  })

  try {
    const newCompany = await company.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
};

module.exports = {
  getCompany,
  createCompany
};