
const Expence = require('../models/expence')
const User=require('../models/user')
const sequelize=require('sequelize')

//using left outer join(which by default) to solve the leaderboard
exports.leaderboard=async(req,res)=>{
    try {
        const leaderboard = await User.findAll({
          attributes: ['id', 'name', 'totalexpence'],
          order: [['totalexpence', 'DESC']],
        });
        return res.status(200).json(leaderboard);
      } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'something went wrong' });
      }
}
