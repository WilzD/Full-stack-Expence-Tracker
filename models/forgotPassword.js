//creating a sequelize object to use its functionality
const Sequelize=require('sequelize')
//including database path
const sequelize=require('../path/database')

//defining a table attribute and constraints
const ForgotPassword=sequelize.define('ForgotPassword',{
    id:{
        type:Sequelize.UUID,
        primaryKey:true,
        allowNull:false,
        defaultValue:Sequelize.UUIDV4
    },
    active:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:true
    },
    expiresby:Sequelize.DATE
})
module.exports=ForgotPassword


