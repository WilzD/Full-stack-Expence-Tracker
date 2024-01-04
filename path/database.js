//including sequelize
const Sequelize=require('sequelize')

//creating a new sequelize object
const db=process.env.DATABASE_NAME
const username=process.env.USER_NAME
const password=process.env.PASSWORD
const sequelize= new Sequelize(db,username,password,{
dialect:'mysql',
host:process.env.DB_HOST
})
module.exports=sequelize