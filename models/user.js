//creating a sequelize object to use its functionality
const Sequelize=require('sequelize')
//including database path
const sequelize=require('../path/database')

//defining a table attribute and constraints
const User=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
      type:Sequelize.STRING,
      allowNull:false,
      unique:true,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    ispremiumuser:Sequelize.BOOLEAN

})
module.exports=User


