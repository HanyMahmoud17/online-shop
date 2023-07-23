const router = require('express').Router();
const bodyParser = require('body-parser');
const authGuard=require('./guards/auth.guard')
const check=require('express-validator').check
const orderController=require('../controllers/order.controller')


router.post('/verifyOrder', 
authGuard.isAuth
,bodyParser.urlencoded({ extended: true}),
orderController.displayOrderVerificationPage
);
router.post('/verifyOrder',
authGuard.isAuth
,bodyParser.urlencoded({ extended: true}),
orderController.displayVerifyPage
)

router.get('/',orderController.getOrder )
// Save the order to the database
router.post('/save', 
authGuard.isAuth
,bodyParser.urlencoded({ extended: true}),
orderController.postOrder
);

router.post('/delete-one/:id',
authGuard.isAuth
,bodyParser.urlencoded({ extended: true}),
orderController.orderDelete
)

router.post('/delete-all',
authGuard.isAuth
,bodyParser.urlencoded({ extended: true}),
orderController.orderDeleteAll
)


module.exports = router