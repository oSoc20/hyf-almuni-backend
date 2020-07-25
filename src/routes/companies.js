const router = require('express-promise-router')();
const CompanyController = require('../controllers/companies');

const passport = require('passport');

//Pass the global passport object into the configuaration function
require('../middleware/passport')(passport);
const auth = passport.authenticate('jwt', {session: false})

router.route('/')
    .get(auth, CompanyController.index)
router.route('/register')
    .post(CompanyController.registerCompany)
router.route('/login')
    .post(CompanyController.loginCompany)

module.exports = router;