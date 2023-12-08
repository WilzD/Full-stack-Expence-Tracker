
const Expence = require('../models/expence')
const User=require('../models/user')

exports.leaderboard=async(req,res)=>{
    try {
        const data=await Expence.findAll()
        const users=await User.findAll()
        const useraggregatedExpence={}
        data.forEach((expence) =>{
            if(useraggregatedExpence[expence.userId]){
                useraggregatedExpence[expence.userId]=useraggregatedExpence[expence.userId]+expence.price
            }
            else{
                useraggregatedExpence[expence.userId]=expence.price
            }
        });
                    
        var leaderboardDetails=[]
        users.forEach((user)=>{
            leaderboardDetails.push({name:user.name,total_cost:useraggregatedExpence[user.id]
            || 0})
        })
        console.log(leaderboardDetails)
        leaderboardDetails.sort((a,b)=>b.total_cost-a.total_cost)
        console.log(leaderboardDetails)
        res.status(200).json(leaderboardDetails)
        
    } catch (error) {
        return res.status(404).json({message:'something went wrong'})
    }
 
}
