const Alumni = require('../models/almuni');

const getAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.json(alumni)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
};

const createAlumni = async (req, res) => {
  const alumni = new Alumni({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  })

  try {
    const newAlumni = await alumni.save();
    res.status(201).json(newAlumni);
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
};

module.exports = {
  getAlumni,
  createAlumni
};