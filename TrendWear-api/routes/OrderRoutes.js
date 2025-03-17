var express = require('express');
var router = express.Router();
let orderController = require('../controller/OrderController');


router.post('/save', orderController.saveOrder);
router.get('/all', orderController.getAllOrders);

module.exports = router;
