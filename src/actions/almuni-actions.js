const Alumni = require('../models/alumni');
const utils = require('../lib/utils');
const Skill = require('../models/skill');
const users = require('../../../osoc-bootcamp/excerises/APIproject/controllers/users');
const Car = require('../../../osoc-bootcamp/excerises/APIproject/models/car');

// get all alumni
const getAllAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find({});
    res.status(200).json({ success: true, alumni})
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
};

//get a single alumni
const getAlumni = async(req, res)=>{
  try {
    const { alumniId } = req.params;
    const alumni = await Alumni.findById(alumniId)
    res.status(200).json({success: true, alumni})
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// update an alumni
const updateAlumni = async(req, res)=>{
  try {
    const { alumniId } = req.params;
    const newAlumni = req.body;
    await Alumni.findByIdAndUpdate(alumniId, newAlumni )
    res.status(200).json({success: true})
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })

  }
}

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

// =====================Alumni-skills=============================//

// create a new skill for a paricular alumni
const createAlumniSkill = async(req, res)=>{
  try {
    const { alumniId } = req.params;
    // crate new skill
    const newSkill = new Skill(req.body);
    //get alumni
    const alumni = await Alumni.findById(alumniId);
    // assign an alumni the new skill
    newSkill.student = alumni;
    // save the skill
    await newSkill.save();
    // Add skill to the alumni skills array
    alumni.skills.push(newSkill)
    // save the user
    await alumni.save()
    res.status(201).json(newSkill)
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// get Alumi skills
const getAlumniSkills = async(req, res)=>{
  try {
    const { alumniId } = req.params;
    const alumni = await Alumni.findById(alumniId).populate('skills')
    res.status(200).json(alumni)
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// get skills
const getSkills = async(req,res)=>{
  try {
    const skills = await Skill.find({})
    res.status(200).json({success: true, skills})
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const createSkill = async(req, res)=>{
  try {
    //1.find the acutal student(alumni)
    const student = await Alumni.findById(req.body.student);
    // 2. create a new skill
    const newSkill = req.body
    console.log(newSkill)
    
    // we don't need the req.body.student becouse it's main purpuse is to find the alumni
    delete newSkill.student
    const skill = new Skill(newSkill)
    skill.student = student;
    await skill.save();
    // 3. add the newly created skill to the acutal student(alumni)
    student.skills.push(skill)
    await student.save()
    // done :)
    res.status(201).json(skill)
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const getSkill = async (req, res)=>{
  try {
    const {skillId} = req.params;
    const skill = await Skill.findById(skillId)
    res.status(200).json({success:true, skill})
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const updateSkill = async (req, res)=>{
  try {
    
    const {skillId} = req.params;
  
    const newSkill = req.body;
    const result = await Skill.findByIdAndUpdate(skillId, newSkill)
    res.status(200).json({success:true})
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }

};

const deleteSkill = async(req,res)=>{
  try {
    const {skillId} = req.params;
  
    // get a skill
    const skill = await Skill.findById(skillId);
    console.log(skill)

    if(!skill) {
     return res.status(404).json({
        success:false,
        error: `skill doesn't exist`
      })
    }
    const studentId = skill.student
    // get a studnet(alumni)
    const alumni = await Alumni.findById(studentId);
  
    // remove the skill
    await skill.remove()
  
    // remove the skill from the alumni list
    alumni.skills.pull(skill)
    
    await alumni.save()
    res.status(200).json({success:true})

  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}
// ========================================================//==========

module.exports = {
  loginAlumni,
  registerAlumni,
  getAlumni,
  getAllAlumni,
  updateAlumni,
  deleteAlumni,
  createAlumniSkill,
  getAlumniSkills,
  getSkills,
  createSkill,
  getSkill,
  updateSkill,
  deleteSkill
};