const router = require('express-promise-router')()
const SkillsController = require('../controllers/skills');

router.route('/')
    .get(SkillsController.getSkills)
    .post(SkillsController.createSkill)
router.route('/:skillId')
    .get(SkillsController.getSkill)
    .patch(SkillsController.updateSkill)
    .delete(SkillsController.deleteSkill)
    
module.exports = router;