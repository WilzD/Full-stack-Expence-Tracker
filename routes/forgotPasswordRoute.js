//including express so we can use module.exports
const express=require('express')

//creating a router object so we can use get,post,delete etc on our routes
const router=express.Router();

const ForgotPasswordController=require('../controller/forgotPasswordController')


router.post('/password/forgotpassword',ForgotPasswordController.forgotPasswordMail)//isme bhejo mail

router.get('/password/resetpassword/:id',ForgotPasswordController.ForgotPasswordLink)//or yaha bhejo reset password ka form

router.post('/password/updatepassword/:id',ForgotPasswordController.resetpassword)

module.exports=router