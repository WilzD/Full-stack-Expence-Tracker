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

//schemas creation during runtime
sequelizeDB.sync('/update-expence/:id').then(() => {
    app.listen(3000)
}).catch(err => console.log(err))



