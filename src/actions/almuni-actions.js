const Alumni = require('../models/alumni');
const utils = require('../lib/utils');

// get all alumni
const getAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find({});
    res.status(200).json({ success: true, alumni})
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
};
// delete all alumni records
const deleteAlumni = async (req, res)=>{
  try {
    await Alumni.deleteMany()
    res.status(204).json({
      message: 'all alumni data are deleted succesfully'
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}
const registerAlumni = async (req, res) => {
  const saltHash = utils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newAlumni = new Alumni({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    hash: hash,
    salt: salt
  })

  try {
    const alumni = await newAlumni.save();
    const jwt = utils.issueJWT(alumni)
    res.status(201).json({ success: true, almuni: alumni, token: jwt.token, expiresIn: jwt.expires
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
};

// login alumni
const loginAlumni = async (req, res)=>{
try {
  const alumni = await Alumni.findOne({ email: req.body.email })
  
  if(!alumni) {
    res.status(401).json({ success: false, message: 'could not found an almuni with this email address'})
  }

  // checking if it is a valid user
  const isValid = utils.validPassword(req.body.password, alumni.hash, alumni.salt)

  if(isValid){
    const tokenObject = utils.issueJWT(alumni);
    res.status(201).json({ success: true, alumni, token: tokenObject.token, expiresIn: tokenObject.expires})
  } else {
    res.status(401).json({ success: false, message: 'you entered invalid email or password'})
  }
} catch (error) {
  res.status(400).json({ success: false, message: error.message })
}

};

module.exports = {
  loginAlumni,
  registerAlumni,
  getAlumni,
  deleteAlumni
};