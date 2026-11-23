const router = require('express').Router();
const controller = require('../controllers/favoriteController');
const wrap = require('../middlewares/asyncHandler');
router.get('/', wrap(controller.list));
router.post('/', wrap(controller.add));
router.delete('/:heroeId', wrap(controller.remove));
module.exports = router;
