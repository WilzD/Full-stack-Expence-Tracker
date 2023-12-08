//including express so we can use module.exports
const express=require('express')

//creating a router object so we can use get,post,delete etc on our routes
const router=express.Router();

const purchaseController=require('../controller/purchaseController')

const  UserAuthentication=require('../path/auth')

// router.get('purchase/premiummembership',UserAuthentication.Authentication,purchaseController.premiumMembership)
router.get('/purchase/premiummembership',UserAuthentication.Authentication,purchaseController.premiumMembership)

router.post('/purchase/updatepremiummembership',UserAuthentication.Authentication,purchaseController.updateTrasactionStatus)

module.exports=router