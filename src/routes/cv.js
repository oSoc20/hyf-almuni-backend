const router = require('express-promise-router')();
const cvController = require('../controllers/cv');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary')

require('dotenv').config()

const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
})

const fileFilter = (req, file, cb)=> {
    // reject if
    if(file.mimetype === "application/pdf"){
        cb(null, true)
    }else{
        cb(new Error(`file must be .pdf format`), false)
    }

};
const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    folder:"alumni",
    // format: async(req, file) => 'png',
    allowedFormats: ["pdf"],
    // transformation : [{crop:"trim"}]
});

const parser = multer({
    storage: storage,
    limits:{ fileSize: 1024 * 1024 * 3 },
    fileFilter:fileFilter
})

router.route('/')
    .get(cvController.getAllCv)
    .post(parser.single('image'),cvController.createCv)
router.route('/:cvId')
    .get(cvController.getCv)
    .patch(parser.single('image'), cvController.updateCv)
    .delete(cvController.deleteCv)


module.exports = router;