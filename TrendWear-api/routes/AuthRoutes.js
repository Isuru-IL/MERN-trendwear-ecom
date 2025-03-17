var express = require('express');
var router = express.Router();
let authController = require('../controller/AuthController');


router.post('/register', authController.register);
router.post('/login', authController.login);


module.exports = router;
