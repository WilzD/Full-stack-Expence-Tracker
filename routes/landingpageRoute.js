//including express so we can use module.exports
const express=require('express')

//creating a router object so we can use get,post,delete etc on our routes
const router=express.Router();

const controller=require('../controller/landingPageController')
router.get('/',controller.landingPage)
router.get('/index',controller.indexPage)
router.get('/index/home',controller.indexPage)
router.get('/forgotPassword',controller.forgotPassword)


module.exports=router