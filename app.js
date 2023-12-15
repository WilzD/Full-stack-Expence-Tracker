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
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));


//routes setup
const expenceRoute=require('./routes/expenceRoute')
app.use(expenceRoute) 

const userRoute=require('./routes/userRoute')
app.use(userRoute)

const orderRoute=require('./routes/purchase')
app.use(orderRoute)

const premiumRoute=require('./routes/premiumRoute')
app.use(premiumRoute) 

const forgotPasswordROute=require('./routes/forgotPasswordRoute')
app.use(forgotPasswordROute)

//making schemas relations
const Expence = require('./models/expence')
const User = require('./models/user')
const Order=require('./models/order')
const ForgotPassword=require('./models/forgotPassword')
const Download=require('./models/downloadHistory')

User.hasMany(Expence)
Expence.belongsTo(User,{constraints:true,onDelete:'CASCADE'})

User.hasMany(Order)
Order.belongsTo(User,{constraints:true,onDelete:'CASCADE'})

User.hasMany(ForgotPassword)
ForgotPassword.belongsTo(User,{constraints:true,onDelete:'CASCADE'})

User.hasMany(Download)
Download.belongsTo(User,{constraints:true,onDelete:'CASCADE'})

//schemas creation during runtime
sequelizeDB.sync().then(() => {
    app.listen(3000)
}).catch(err => console.log(err))



