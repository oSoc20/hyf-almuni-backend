const Alumni = require('../models/alumni');
const utils = require('../lib/utils')
const Skill = require('../models/skill')
const Language = require('../models/language')

module.exports = {
    index: async (req, res, next)=>{
        const alumni = await Alumni.find({})
        .populate('languages')
        .populate('skills')
        .populate('media')
        .populate('cv')
        .populate('picture');
        res.status(200).json({alumni})
    },

    registerAlumni: async (req, res, next)=>{
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
        const alumni = await newAlumni.save();
        const jwt = utils.issueJWT(alumni)
        res.status(201).json({ success: true, almuni: alumni, token: jwt.token, expiresIn: jwt.expires
        });
    },

    loginAlumni: async (req, res, next)=>{
        const alumni = await Alumni.findOne({ email: req.body.email })  
        if(!alumni) {
           return res.status(401).json({ success: false, message: 'could not found an almuni with this email address'})
        }
        // checking if it is a valid user
        const isValid = utils.validPassword(req.body.password, alumni.hash, alumni.salt)
        if(isValid){
            const tokenObject = utils.issueJWT(alumni);
            res.status(201).json({ success: true, alumni, token: tokenObject.token, expiresIn: tokenObject.expires})
        } else {
            res.status(401).json({ success: false, message: 'you entered invalid email or password'})
        }
    },

    getAlumni: async(req, res, next)=>{
        const { alumniId } = req.params;
        const alumni = await Alumni.findById(alumniId)
        .populate('languages')
        .populate('skills')
        .populate('media')
        .populate('cv')
        .populate('picture')
        res.status(200).json({success: true, alumni})      
    },

    updateAlumni: async(req, res, next)=>{
        const { alumniId } = req.params;
        const newAlumni = req.body;
        await Alumni.findByIdAndUpdate(alumniId, newAlumni )
        res.status(200).json({success: true})
    },
//==================skill==================//
    // createAlumniSkill: async(req, res, next)=>{
    //     const { alumniId } = req.params;
    //     // crate new skill
    //     const newSkill = new Skill(req.body);
    //     //get alumni
    //     const alumni = await Alumni.findById(alumniId);
    //     // assign an alumni the new skill
    //     newSkill.student = alumni;
    //     // save the skill
    //     await newSkill.save();
    //     // Add skill to the alumni skills array
    //     alumni.skills.push(newSkill)
    //     // save the alumni
    //     await alumni.save()
    //     res.status(201).json(newSkill)
    // },

    getAlumniSkills: async(req, res, next)=>{
        const { alumniId } = req.params;
        const alumni = await Alumni.findById(alumniId).populate('skills')
        res.status(200).json(alumni.skills)
    },

    // //================language======================================//
    // createAlumniLanguage: async(req, res, next)=>{
    //     const { alumniId } = req.params;
    //     // crate new language
    //     const newLanguage = new Language(req.body);
    //     //get alumni
    //     const alumni = await Alumni.findById(alumniId);
    //     // assign an alumni the new language
    //     newLanguage.student = alumni;
    //     // save the language
    //     await newLanguage.save();
    //     // Add the language to the alumni languages array
    //     alumni.languages.push(newLanguage)
    //     // save the alumni
    //     await alumni.save()
    //     res.status(201).json(newLanguage)
    // },

    getAlumniLanguages: async(req, res, next)=>{
        const { alumniId } = req.params;
        const alumni = await Alumni.findById(alumniId).populate('languages')
        res.status(200).json(alumni.languages)
    },

    //================================media====================//
    getAlumniMedia: async (req, res) => {
        const {alumniId} = req.params;
        const alumni = await Alumni.findById(alumniId).populate('media')
        res.status(200).json(alumni.media)
    },

    getAlumniPicture: async (req, res, next)=>{
        const {alumniId} = req.params;
        const alumni = await Alumni.findById(alumniId).populate('picture')
        res.status(200).json(alumni.profileImage)
    },

    getAlumniCv: async (req, res, next)=>{
        const {alumniId} = req.params;
        const alumni = await Alumni.findById(alumniId).populate('cv')
        res.status(200).json(alumni.cv)
    }
}