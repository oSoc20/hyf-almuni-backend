const Media = require('../models/media');
const Alumni = require('../models/alumni')

module.exports = {
    getMedia: async (req, res, next)=>{
        const media = await Media.find({});
        res.status(200).json({media})
    },

    createMedia: async (req, res, next)=>{
        //1. find the alumni
        const student = await Alumni.findById(req.body.student);
        //2. create a new media
        const newMedia = req.body;
        // we don't need the req.body.student becouse it's main purpuse is to find the alumni
        delete newMedia.student;
        const media = new Media(newMedia)
        media.student = student;
        await media.save();
        // 3. add the newly created media to the acutal student(alumni)
        student.media.push(media);
        await student.save();
        res.status(201).json({media})
    },

    getMedium : async (req, res, next)=>{
        const {mediaId} = req.params;
        const media = await Media.findById(mediaId)
        res.status(200).json({success:true, media})
    },

    updateMedium: async (req, res, next)=>{
        const {mediaId} = req.params;
        const newMedia = req.body;
        const result = await Media.findOneAndUpdate(mediaId, newMedia)
        res.status(200).json({success:true})
    },

    deleteMedium: async (req, res) => {
        const {mediaId} = req.params;
        const media = await Media.findById(mediaId);
        if(!media){
            return res.status(404).json({success:false, error:`media doesn't exist`})
        }
        const studentId = media.student
        // get the alumni
        const alumni = await Alumni.findById(studentId);
        // remove the medium
        await media.remove()
        // remove the media from the alumni list
        alumni.media.pull(media)
        await alumni.save()
        res.status(200).json({success:true})
    }
}
