const router = require('express').Router();
const controller = require('../controller/loginController');

router.get("/", controller.loginPage);

module.exports = router;