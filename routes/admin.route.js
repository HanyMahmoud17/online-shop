const router = require('express').Router();
const bodyParser = require('body-parser');
const check=require('express-validator').check
const molter=require('multer')

const adminController=require('../controllers/admin.controller')
const adminGuard=require('./guards/admin.guard');
const multer = require('multer');

router.get('/add',adminGuard,adminController.getAdd)
router.post('/add',
adminGuard,multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'images')
        },
        filename:(req,file,cb)=>{
            cb(null, Date.now() + '-' + file.originalname )
        }
    })
}).single('image')
,check('image').custom((value,{req})=>{
    if(req.file) return true
    else throw 'Image file is required'
})
,adminController.postAdd
)

router.get('/orders',adminGuard,adminController.getOrders)
router.post('/orders'
,adminGuard
,bodyParser.urlencoded({ extended: true }),
adminController.changeOrderStatus

)

module.exports = router