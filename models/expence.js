//creating a sequelize object to use its functionality
const Sequelize=require('sequelize')
//including database path
const sequelize=require('../path/database')

//defining a table attribute and constraints
const Expence=sequelize.define('expence',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    price:{
        type:Sequelize.BIGINT,
        allowNull:false,
    },
    category:{
      type:Sequelize.STRING,
      allowNull:false,
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    }

})
module.exports=Expence


