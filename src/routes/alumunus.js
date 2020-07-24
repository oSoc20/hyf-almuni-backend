// const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')()
const AlumniControllers = require('../controllers/alumnus')
const passport = require('passport');

//Pass the global passport object into the configuaration function
require('../middleware/passport')(passport);
const auth = passport.authenticate('jwt', {session: false})

router.route('/')
      .get( AlumniControllers.index)
router.route('/register')
      .post(AlumniControllers.registerAlumni)
router.route('/login')
      .post(AlumniControllers.loginAlumni)
router.route('/:alumniId')
      .get( AlumniControllers.getAlumni)
      .patch( AlumniControllers.updateAlumni)
// router.route('/:alumniId/skill')
//       .post( AlumniControllers.createAlumniSkill)
//       .get( AlumniControllers.getAlumniSkills)

module.exports = router;