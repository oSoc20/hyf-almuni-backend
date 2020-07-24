const router = require('express-promise-router')()
const LanguagesController = require('../controllers/lanugages');

router.route('/')
    .get(LanguagesController.getLanguages)
    .post(LanguagesController.createLanguage)
router.route('/:languageId')
    .get(LanguagesController.getLanguage)
    .patch(LanguagesController.updateLanguage)
    .delete(LanguagesController.deleteLanguage)
    
module.exports = router;