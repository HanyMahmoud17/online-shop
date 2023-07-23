
const router = require('express').Router();
const bodyParser = require('body-parser');
const authGuard=require('./guards/auth.guard')
const check=require('express-validator').check
const cartController=require('../controllers/cart.controller')

router.get('/',cartController.getCart )
router.post('/'
,authGuard.isAuth
,bodyParser.urlencoded({ extended: true})
,check('amount').not().isEmpty().withMessage('Enter amount').isInt({min: 1}).withMessage('amount must be greater than 0')
,cartController.postCart
)

router.post('/save',
authGuard.isAuth
,bodyParser.urlencoded({ extended: true})
,check('amount').not().isEmpty().withMessage('Enter amount').isInt({min: 1}).withMessage('amount must be greater than 0'),
cartController.postSave
)


router.post('/delete',
authGuard.isAuth
,bodyParser.urlencoded({ extended: true}),
cartController.postDelete
)
router.post('/delete-all',
authGuard.isAuth
,bodyParser.urlencoded({ extended: true}),
cartController.postDeleteAll
)


module.exports = router