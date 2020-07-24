const router = require('express-promise-router')();
const MediaController = require('../controllers/media');

router.route('/')
    .get(MediaController.getMedia)
    .post(MediaController.createMedia)
router.route('/:mediaId')
    .get(MediaController.getMedium)
    .patch(MediaController.updateMedium)
    .delete(MediaController.deleteMedium)

module.exports = router;