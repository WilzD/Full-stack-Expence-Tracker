//including models so we can use the Model data
const User = require('../models/user')

//using return statement because we are sending a promise to the api user

//adding a user
exports.postUser = async (req, res) => {
    try{
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        await User.create({name: name, email: email, password: password })
        return res.status(200)
    }
    catch(error){
       let data='error'
       return res.status(403).json(data)
    }

}
