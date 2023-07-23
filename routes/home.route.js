// i call the express here
const router = require('express').Router();
const authGuard=require('./guards/auth.guard')

// import to controller
const homeController=require('../controllers/home.controller')

router.get('/', homeController.getHome)

// to make export to router
module.exports = router
