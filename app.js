const express = require('express')
const app = express()

//database setup
const sequelizeDB = require('./path/database')

//bodyparser setup
const bodyParser = require('body-parser')
app.use(bodyParser.json({ extended: false }))

//cors error prevention
const cors = require('cors')
const { where } = require('sequelize')
app.use(cors())

//routes setup
const expenceRoute=require('./routes/expenceRoute')
app.use(expenceRoute) 

const userRoute=require('./routes/userRoute')

app.use(userRoute)

//making schemas relations
const Expence = require('./models/expence')
const User = require('./models/user')
User.hasMany(Expence,{constraints:true,onDelete:'CASCADE'})
Expence.belongsTo(User)

//schemas creation during runtime
sequelizeDB.sync().then(() => {
    app.listen(3000)
}).catch(err => console.log(err))



