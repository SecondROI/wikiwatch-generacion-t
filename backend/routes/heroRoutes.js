const router = require('express').Router();
const controller = require('../controllers/heroController');
const wrap = require('../middlewares/asyncHandler');
router.get('/', wrap(controller.list));
router.get('/:id', wrap(controller.getById));
module.exports = router;
