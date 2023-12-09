//including express so we can use module.exports
const express=require('express')

//creating a router object so we can use get,post,delete etc on our routes
const router=express.Router();

const controller=require('../controller/userController')


router.post('/user',controller.postUser)
router.post('/user-login',controller.getUser) 

module.exports=router