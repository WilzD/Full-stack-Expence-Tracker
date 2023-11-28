//including express so we can use module.exports
const express=require('express')

//creating a router object so we can use get,post,delete etc on our routes
const router=express.Router();

const controller=require('../controller/expenceController')

router.get('/expences',controller.getExpences)

router.post('/add-expence',controller.postExpence)

router.delete('/delete/:id',controller.deleteExpence)

router.get('/edit-expence/:id',controller.editExpence)

router.put('/update-expence/:id',controller.updateExpence)

module.exports=router