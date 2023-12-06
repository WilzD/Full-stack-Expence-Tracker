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
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

        // console.log(email,name,password)
        const data = await User.findAll();
        if(data[0].name===name && data[0].email===email && data[0].password===password  ){
            return res.status(200).json(data)
        }else{
            return res.status(403).json(data)
        }
    }
    catch (error) {
        let data = 'error'
        console.log(error)
        return res.status(404).json(data)
    }
}
