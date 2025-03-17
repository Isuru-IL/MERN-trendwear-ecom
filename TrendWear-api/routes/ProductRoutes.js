var express = require('express');
var router = express.Router();
let productController = require('../controller/ProductController');
const verifyToken = require("../middleware/AuthMiddleware");

/* GET users listing. */
router.get('/all',verifyToken, productController.getAllProducts);
router.post("/save",verifyToken, productController.saveProducts);
router.patch("/update",verifyToken, productController.updateProducts);
router.delete("/delete/:id",verifyToken, productController.deleteProduct);
router.get("/getProductById/:id",verifyToken, productController.getProductById);

module.exports = router;
