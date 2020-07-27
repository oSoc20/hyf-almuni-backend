const AlumniProfilePicture = require('../models/alumni-profile-picture');
const Alumni = require('../models/alumni');


module.exports = {
    getPictures: async (req, res, next)=>{
        res.status(200).json({success:true, message: `gallery of all alumni coming soon :)`})
    },

    createPicture: async (req, res, next)=>{
        const student = await Alumni.findById(req.body.student);
        const profilePicture = new AlumniProfilePicture({
            path: req.file.path,
            filename:req.file.filename,
            originalname: req.file.originalname,
            student: student._id
        })
        await profilePicture.save()
        student.profileImage.push(profilePicture);

        await student.save()
        res.status(201).json(profilePicture)
    },

    getPicture: async (req, res, next)=>{
        const {imageId} = req.params;
        const profilePicture = await AlumniProfilePicture.findById(imageId);
        res.status(200).json(profilePicture)
    },

    updatePicture: async (req, res, next)=>{
        const {imageId} = req.params;
        const profilePicture = {
            path: req.file.path,
            filename:req.file.filename,
            originalname: req.file.originalname
        }
        await AlumniProfilePicture.findByIdAndUpdate(imageId, profilePicture);
        res.status(200).json({success:true})    
    },

    deletePicture: async (req, res, next)=>{
        const {imageId}= req.params;
        const profilePicture = await AlumniProfilePicture.findById(imageId);
        if(!profilePicture){
            return res.status(404).json({success:false,message:`picture doesn't exist`})
        }

        const studentId = profilePicture.student
        // get the alumni 
        const alumni = await Alumni.findById(studentId);
        // remove the picture
        await profilePicture.remove();
        // remove the picture from the alumni list
        alumni.profileImage.pull(profilePicture)
        await alumni.save()
        res.status(200).json({success:true})
    }
};
