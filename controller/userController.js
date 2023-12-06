//including models so we can use the Model data
const User = require('../models/user')

//using return statement because we are sending a promise to the api user

//adding a user
exports.postUser = async (req, res) => {
    try {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        await User.create({ name: name, email: email, password: password })
        return res.status(200)
    }
    catch (error) {
        let data = 'error'
        return res.status(403).json(data)
    }

}

exports.getUser = async (req, res) => {
    try {
        const name=req.body.name
        const email = req.body.email
        const password = req.body.password
        const data=await User.findAll({where:{email:email}})

        if(data.length>0){
             if(data[0].name===name){
                if(data[0].password===password){
                    res.status(200).json({success:true,message:'user login successfully'})
                }
                else{
                    return res.status(402).json({success:false,message:"wrong password"})
                } 
             }
             else{
               return res.status(403).json({success:false,message:"username not found"})
             }
        }
        else{
            return res.status(403).json({success:false,message:'wrong email id'})
        }
    }
    catch (error) {
       return  res.status(404).json({success:false,message:"user not found"})
    }
}

