//including express so we can use module.exports
const express=require('express')

//creating a router object so we can use get,post,delete etc on our routes
const router=express.Router();

const Premiumcontroller=require('../controller/premiumController')

router.get('/purchase/premiumuser/leaderboard',Premiumcontroller.leaderboard)

module.exports=router