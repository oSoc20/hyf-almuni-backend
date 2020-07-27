// const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')()
const AlumniControllers = require('../controllers/alumnus')
const alumniPassport = require('passport');
const companyPassport = require('passport');

//Pass the global passport object into the configuaration function
require('../middleware/passport')(alumniPassport);
require('../middleware/passport')(companyPassport);
const alumniAuth = alumniPassport.authenticate('alumni-rule', {session: false})
const companyAuth = companyPassport.authenticate('company-rule', {session: false})

router.route('/')
      .get(companyAuth, AlumniControllers.index)
router.route('/register')
      .post(AlumniControllers.registerAlumni)
router.route('/login')
      .post(AlumniControllers.loginAlumni)
router.route('/:alumniId')
      .get(alumniAuth, AlumniControllers.getAlumni)
      .patch(alumniAuth, AlumniControllers.updateAlumni)
router.route('/:alumniId/skill')
      .get( AlumniControllers.getAlumniSkills)
//       .post( AlumniControllers.createAlumniSkill)
router.route('/:alumniId/language')
      .get( AlumniControllers.getAlumniLanguages)
router.route('/:alumniId/media')
      .get( AlumniControllers.getAlumniMedia)
router.route('/:alumniId/image')
      .get( AlumniControllers.getAlumniPicture)
router.route('/:alumniId/cv')
      .get( AlumniControllers.getAlumniCv)

module.exports = router;