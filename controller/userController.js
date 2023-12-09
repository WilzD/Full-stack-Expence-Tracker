//including models so we can use the Model data
const User = require('../models/user')
//for password hashing
const bcrypt = require('bcrypt')
//for creating token
const jwt = require('jsonwebtoken')
const { use } = require('../routes/expenceRoute')




function generateAccessToken(id) {
    return jwt.sign({ user: id }, '5TObIsTmyTGZ40VdVKkloIFgBYyerMybLzl+Ijajbgid+FkZocjgEfDKVgtvVte/')
}
//adding a user
exports.postUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (name !== '') {
            if (email !== '') {
                if (password !== '') {
                    const saltround = 10 //salt generate a random string and we are adding its cost to 10 so that password will be more uniquly hashed
                    bcrypt.hash(password, saltround, async (err, hash) => {
                        await User.create({ name: name, email: email, password: hash })//now password stored in DB will be that hash string
                        return res.status(201).json({ message: 'Successfully Created New User' })
                    })
                } else {
                    return res.status(401).json({ message: "Bad Parameter . password can't be empty" })
                }
            } else {
                return res.status(402).json({ message: "Bad Parameter . email can't be empty or this email is already registered " })
            }
        } else {
            return res.status(403).json({ message: "Bad Parameter . name can't be empty" })
        }


    }
    catch (error) {
        return res.status(500).json({ message: 'bad request' })
    }

}

//finding user and logging in
exports.getUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (name === '' || email === '' || password === '') {
            return res.status(500).json({ message: 'either name , email or password is not provided' })
        }

        const data = await User.findAll({ where: { email: email } })
        if (data.length > 0) {
            if (data[0].name === name) {
                bcrypt.compare(password, data[0].password, (err, result) => {
                    if (result) {
                        res.status(200).json({ success: true, message: 'user login successfully', token: generateAccessToken(data[0].id), data })//making token by passing id to the function
                    }
                    else {
                        return res.status(402).json({ success: false, message: "wrong password" })
                    }
                })
            }
            else {
                return res.status(401).json({ success: false, message: "username not found" })
            }
        }
        else {
            return res.status(403).json({ success: false, message: 'wrong email id' })
        }
    }
    catch (error) {
        res.status(404).json({ success: false, message: "user not found" })
    }

}


