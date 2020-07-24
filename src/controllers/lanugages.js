const Language = require('../models/language');
const Alumni = require('../models/alumni')

module.exports = {
    getLanguages: async (req, res, next)=>{
        const languages = await Language.find({})
        res.status(200).json(languages)
    },

    createLanguage: async (req,res, next)=>{
        //1.find the acutal student(alumni)
        const student = await Alumni.findById(req.body.student);
        // 2. create a new language
        const newLanguage = req.body
        // we don't need the req.body.student becouse it's main purpuse is to find the alumni
        delete newLanguage.student
        const language = new Language(newLanguage)
        language.student = student;
        await language.save();
        // 3. add the newly created language to the acutal student(alumni)
        student.languages.push(language)
        await student.save()
        // done :)
        res.status(201).json(language)
    },

    getLanguage: async (req, res, next)=>{
        const {languageId} = req.params;
        const language = await Language.findById(languageId)
        res.status(200).json({success:true, language})
    },

    updateLanguage: async (req, res, next)=>{
        const {languageId} = req.params;
        const newLanguage = req.body;
        const result = await Language.findByIdAndUpdate(languageId, newLanguage)
        res.status(200).json({success:true})
    },

    deleteLanguage: async(req, res, next)=>{
        const {languageId} = req.params;
        // get a language
        const language = await Language.findById(languageId);
        if(!language) {
            return res.status(404).json({ success:false, error: `language doesn't exist`})
        }
        const studentId = language.student
        // get a studnet(alumni)
        const alumni = await Alumni.findById(studentId);
        // remove the language
        await language.remove() 
        // remove the language from the alumni list
        alumni.languages.pull(language)     
        await alumni.save()
        res.status(200).json({success:true})
    }
}