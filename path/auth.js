
const User=require('../models/user')
const jwt=require('jsonwebtoken')

exports.Authentication=async(req,res,next)=>{
    try {
        const token=req.header('Authorization') //token will be in req.headers
        const user=jwt.verify(token,'5TObIsTmyTGZ40VdVKkloIFgBYyerMybLzl+Ijajbgid+FkZocjgEfDKVgtvVte/')//here what ever pass like id,name we got as an object
        const findUser=await User.findByPk(user.user) //in user object our user has that id which we have to find in database
        req.user=findUser ///****vvimp to pass this finded user globally to other middlewares unless we cannot see data of that user */
        next()   //caaling next so other middleware can run after this
    } catch (error) {
        return res.status(404).json({message:'Unauthorise User'})
    }

}