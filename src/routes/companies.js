const router = require('express-promise-router')();
const CompanyController = require('../controllers/companies');
const companyPassport = require('passport');

require('../middleware/passport')(companyPassport);
const companyAuth = companyPassport.authenticate('company-rule', {session: false})

router.route('/')
    .get(CompanyController.index)
router.route('/register')
    .post(CompanyController.registerCompany)
router.route('/login')
    .post(CompanyController.loginCompany)
router.route('/:companyId')
    .get(companyAuth, CompanyController.getCompany)
    .patch(companyAuth, CompanyController.updateCompany)

module.exports = router;