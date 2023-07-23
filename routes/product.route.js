
const router = require('express').Router();
const authGuard=require('./guards/auth.guard')
const productController=require('../controllers/product.controller')

router.get('/',productController.getProduct )
router.get('/:id',authGuard.isAuth,productController.getProductById )

module.exports = router