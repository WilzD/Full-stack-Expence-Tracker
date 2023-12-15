
const Sequelize=require('sequelize')
const sequelize=require('../path/database')

const DownloadHistory=sequelize.define('download',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    url:Sequelize.STRING,
})
module.exports=DownloadHistory