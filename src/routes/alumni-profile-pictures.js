const router = require('express-promise-router')();
const AlumniProfilePictureController = require('../controllers/alumni-profile-pictures');
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

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    folder:"alumni",
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation : [{width:500, height:500, crop:"trim"}]
});

const parser = multer({
    storage: storage,
    limits:{ fileSize: 1024 * 1024 * 2 }
})

router.route('/')
    .get(AlumniProfilePictureController.getPictures)
    .post(parser.single('image'),AlumniProfilePictureController.createPicture)
router.route('/:imageId')
    .get(AlumniProfilePictureController.getPicture)
    .patch(parser.single('image'), AlumniProfilePictureController.updatePicture)
    .delete(AlumniProfilePictureController.deletePicture)

module.exports = router;