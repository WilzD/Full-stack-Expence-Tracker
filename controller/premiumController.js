
const Expence = require('../models/expence')
const User=require('../models/user')
const sequelize=require('sequelize')

//using left outer join(which by default) to solve the leaderboard
exports.leaderboard=async(req,res)=>{
    try {
        const aggregateExpences=await User.findAll({
            attributes:['id','name',[sequelize.fn('sum',sequelize.col('expences.price')),'total_cost']],
            include:[
            {
              model:Expence,
              attributes:[],
            }
        ],
            group:['user.id'],
            order:[['total_cost','DESC']] //making descending order on basis of totat_cost which we make by join
        })
        console.log(aggregateExpences)
        return res.status(200).json(aggregateExpences)
    } catch (error) {
        console.log(error)
        return res.status(404).json({message:"something went wrong"})
    }
}
