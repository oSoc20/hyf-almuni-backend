const Skill = require('../models/skill');
const Alumni = require('../models/alumni')

module.exports = {
    getSkills: async (req, res, next)=>{
        const skills = await Skill.find({})
        res.status(200).json(skills)
    },

    createSkill: async (req,res, next)=>{
        //1.find the acutal student(alumni)
        const student = await Alumni.findById(req.body.student);
        // 2. create a new skill
        const newSkill = req.body
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
    },

    getSkill: async (req, res, next)=>{
        const {skillId} = req.params;
        const skill = await Skill.findById(skillId)
        res.status(200).json({success:true, skill})
    },

    updateSkill: async (req, res, next)=>{
        const {skillId} = req.params;
        const newSkill = req.body;
        const result = await Skill.findByIdAndUpdate(skillId, newSkill)
        res.status(200).json({success:true})
    },

    deleteSkill: async(req, res, next)=>{
        const {skillId} = req.params;
        // get a skill
        const skill = await Skill.findById(skillId);
        if(!skill) {
            return res.status(404).json({ success:false, error: `skill doesn't exist`})
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
    }
}