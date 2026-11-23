const express = require("express");
const heroController = require("../controllers/heroController");
const router = express.Router();

router.get("/", heroController.getHeroes);

module.exports = router;
