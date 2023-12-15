
const User=require('../models/user')
const Download=require('../models/downloadHistory')
const UserServices=require('../services/userServices')
const S3Services=require('../services/s3Services')
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


exports.DownloadAllexpences=async(req,res)=>{
  try {
    const expences=await UserServices.getExpences(req)
    // console.log(expences)
    const stringFieldExpences=JSON.stringify(expences)
    const filename=`Expence.txt${req.user.id}/${new Date()}` // so that file should have unique name always
    const fileURL=await S3Services.uploadToS3(stringFieldExpences,filename) // this function returns us an promise which has url of txt file
    await req.user.createDownload({url:fileURL})
    return res.status(200).json({fileURL,success:true})

  } catch (error) {
    return res.status(404).json({message:'something went wrong'})
  }
}

exports.DownloadHistory=async(req,res)=>{
  const downloadHistory=await Download.findAll()
  return res.status(200).json({downloadHistory})
}
