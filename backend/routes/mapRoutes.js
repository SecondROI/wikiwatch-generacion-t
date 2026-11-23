const router = require('express').Router();
const controller = require('../controllers/mapController');
const wrap = require('../middlewares/asyncHandler');
router.get('/mapas', wrap(controller.listMaps));
router.get('/mapas/:id', wrap(controller.getMapById));
router.get('/modos', wrap(controller.listModes));
router.get('/modos/:id', wrap(controller.getModeById));
module.exports = router;
