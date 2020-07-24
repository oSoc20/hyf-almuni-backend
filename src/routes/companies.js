const router = require('express-promise-router')();
const CompanyController = require('../controllers/companies');

router.route('/')
    .get(CompanyController.index)
router.route('/register')
    .post(CompanyController.registerCompany)
router.route('/login')
    .post(CompanyController.loginCompany)

module.exports = router;