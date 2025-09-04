const router = require("express").Router();
const indexController = require("../controller/indexController");

router.get("/", indexController.getIndexPage);

module.exports = router;