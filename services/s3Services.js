const AWS=require('aws-sdk')

 exports.uploadToS3=async(data,filename)=>{
    const BUCKET_NAME=process.env.BUCKET_NAME
    const IAM_USER_KEY=process.env.IAM_USER_KEY//like username
    const IAM_USER_SECRET=process.env.IAM_USER_SECRET//like user password
     let s3bucket=new AWS.S3({
          accessKeyId:IAM_USER_KEY,
          secretAccessKey:IAM_USER_SECRET
     })
    
      var params={
        Bucket:BUCKET_NAME,
        Key:filename,
        Body:data,
        ACL:'public-read'  // so that files can be acceble to user download as we set its access control to public
      }
      return new Promise((resolve,reject)=>{ // sending promise because upload is an async task we have to wait for it 
        s3bucket.upload(params, async(err,success)=>{
          if(err){
            reject (err)
          }
          else{
            resolve(success.Location)// upload returns us an object we call it as success and success.location has that exact url which we have to return to download function
          }
       })
      })
    
    }
    