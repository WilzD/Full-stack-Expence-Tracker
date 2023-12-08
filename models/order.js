//creating a sequelize object to use its functionality
const Sequelize=require('sequelize')
//including database path
const sequelize=require('../path/database')

const Order=sequelize.define('order',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },

    paymentId:Sequelize.STRING,
    orderId:Sequelize.STRING,
    status:Sequelize.STRING,
})
 module.exports=Order