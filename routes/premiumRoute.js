//including express so we can use module.exports
const express=require('express')

//creating a router object so we can use get,post,delete etc on our routes
const router=express.Router();
const  UserAuthentication=require('../path/auth')

const Premiumcontroller=require('../controller/premiumController')

router.get('/purchase/premiumuser/leaderboard',UserAuthentication.Authentication,Premiumcontroller.leaderboard)

router.get('/expences/download',UserAuthentication.Authentication,Premiumcontroller.DownloadAllexpences)

router.get('/expences/download-history',UserAuthentication.Authentication,Premiumcontroller.DownloadHistory)

module.exports=router