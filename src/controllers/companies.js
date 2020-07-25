const Company = require('../models/company');
const utils = require('../lib/utils');

module.exports = {
    index: async(req, res, next)=>{
        const company = await Company.find({})
        res.status(200).json({success:true, message:`only manon can see all comapnies`})
    },

    registerCompany: async(req, res, next)=>{
        if(req.body.password === undefined){
            return res.status(401).json({success:false, error:`password could not be blank`});
        }
        const saltHash = utils.genPassword(req.body.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;
        const newCompany = new Company({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            companyName: req.body.companyName,
            hash: hash,
            salt: salt
        })
        const company = await newCompany.save();
        const jwt = utils.issueJWT(company)
        res.status(201).json({success:true, company, token: jwt.token, expiresIn: jwt.expires})
    },

    loginCompany: async (req, res, next)=>{
        const company = await Company.findOne({email: req.body.email});
        if(!company){
            return res.status(401).json({ success: false, message: `Can't find found a user with this email`})
        }
        // check if it is valid user email
        const isValid = utils.validPassword(req.body.password,company.hash, company.salt)
        if(isValid){
            const tokenObject = utils.issueJWT(company);
            res.status(201).json({success:true,company,token: tokenObject.token, expiresIn: tokenObject.expires})
        }else{
            res.status(401).json({success:false,message:`you entered invalid password or email`})
        }
    },

    getCompany: async (req, res, next)=>{
        const {companyId} = req.params;
        const company = await Company.findById(companyId);
        res.status(200).json({success:true, company})
    },

    updateCompany: async (req, res, next)=>{
        const {companyId} = req.params;
        const newCompany = req.body
        await Company.findByIdAndUpdate(companyId, newCompany)
        res.status(200).json({success:true})
    }
}