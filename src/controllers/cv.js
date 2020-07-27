const Cv = require('../models/cv');
const Alumni = require('../models/alumni');


module.exports = {
    getAllCv: async (req, res, next)=>{
        res.status(200).json({success:true, message: `cv of all alumni coming soon :)`})
    },

    createCv: async (req, res, next)=>{
        const student = await Alumni.findById(req.body.student);
        const url = req.file.path;
        const splited = url.split('.pdf')
        const path = `${splited[0]}.jpg`

        const newCv = new Cv({
            path: path,
            filename:req.file.filename,
            originalname: req.file.originalname,
            student: student._id
        })
    
        await newCv.save()
        student.cv.push(newCv);
        await student.save()
        console.log('after save', student)
        res.status(201).json(newCv)
    },

    getCv: async (req, res, next)=>{
        const {cvId} = req.params;
        const cv = await Cv.findById(cvId);
        res.status(200).json(cv)
    },

    updateCv: async (req, res, next)=>{
        const {cvId} = req.params;

        const url = req.file.path;
        const splited = url.split('.pdf')
        const path = `${splited[0]}.jpg`

        const cv = {
            path: path,
            filename:req.file.filename,
            originalname: req.file.originalname,
        }
        await Cv.findByIdAndUpdate(cvId, cv);
        res.status(200).json({success:true})    
    },

    deleteCv: async (req, res, next)=>{
        const {cvId} = req.params;
        const cv = await Cv.findById(cvId);
        if(!cv){
            return res.status(404).json({success:false,message:`cv doesn't exist`})
        }

        const studentId = cv.student
        // get the alumni 
        const alumni = await Alumni.findById(studentId);
        // remove the cv
        await cv.remove();
        // remove the cv from the alumni list
        alumni.cv.pull(cv)
        await alumni.save()
        res.status(200).json({success:true})
    }
};
