const express = require('express')
const app = express()
const path=require('path')

//always put dotenv before database execution
require('dotenv').config()

//helmet security
const helmet=require('helmet')

//database setup
const sequelizeDB = require('./path/database')


//bodyparser setup
const bodyParser = require('body-parser')
app.use(bodyParser.json({ extended: false }))

 
//for using public files
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//cors error prevention
const cors = require('cors')
const { where } = require('sequelize')
app.use(cors())

//routes setup
const landingpageRoute=require('./routes/landingpageRoute')
app.use(landingpageRoute)

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

//using helmet after all routing setup
app.use(helmet())


app.use((req,res)=>{
    console.log(req.url)
    res.sendFile(path.join(__dirname,`${req.url}`))
})

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
const port=process.env.PORT
sequelizeDB.sync().then(() => {
    app.listen(port)
}).catch(err => console.log(err))



