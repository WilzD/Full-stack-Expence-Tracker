//including express so we can use module.exports
const express=require('express')

//creating a router object so we can use get,post,delete etc on our routes
const router=express.Router();

const controller=require('../controller/expenceController')
const  UserAuthentication=require('../path/auth') //for user authentication with token

router.get('/expences',UserAuthentication.Authentication,controller.getExpences)//first user authentication middleware will run if got succes then the expence will shown

router.post('/add-expence',UserAuthentication.Authentication,controller.postExpence)

router.delete('/delete/:id',UserAuthentication.Authentication,controller.deleteExpence)

router.get('/edit-expence/:id',UserAuthentication.Authentication,controller.editExpence)

router.put('/update-expence/:id',UserAuthentication.Authentication,controller.updateExpence)


module.exports=router