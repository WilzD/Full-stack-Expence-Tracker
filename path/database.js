//including sequelize
const Sequelize=require('sequelize')

//creating a new sequelize object
const sequelize= new Sequelize('expencetrackerdb','root','123456',{
dialect:'mysql',
host:'localhost'
})
module.exports=sequelize