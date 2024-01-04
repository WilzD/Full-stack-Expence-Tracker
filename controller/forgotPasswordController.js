
const ForgotPassword = require('../models/forgotPassword')
const User = require('../models/user')

const uuid = require('uuid')
const bcrypt = require('bcrypt')
//sendinblue setup to send mails
const Sib = require('sib-api-v3-sdk')

require('dotenv').config()

const client = Sib.ApiClient.instance

const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY

exports.forgotPasswordMail = async (req, res) => {
    try {
        const { email} = req.body
     
        const user = await User.findOne({ where: { email:email} })
        if (user) {
        const sender = {
            email: 'wilsondynamic3@gmail.com',
            name: 'Trivial Expense Pvt ltd',
        }

        const receivers = [
            {
                email: email,
            },
        ]

        const resetresponse=await user.createForgotPassword({})
        const {id}=resetresponse
        const tranEmailApi = new Sib.TransactionalEmailsApi()
        const mailresponse=await tranEmailApi
            .sendTransacEmail({
                sender,
                to: receivers,
                subject: 'Reset your password for Expence Tracker',
                textContent: `Hello ${user.name} you have raised a request for reset/change your password`,
                params: {
                    role: id
                }
              ,
                htmlContent:  `
                <!DOCTYPE html>
                  <html>
                  <head>
                      <title>Password Reset</title>
                  </head>
                  <body>
                      <h1>Reset Your Password</h1>
                      <h3>Hello ${user.name} you have raised a request for reset/change your password</h3>
                      <p>Click the button below to reset your password:</p>
                      <p>Link is valid for 5 minutes</p>
                      <button><a href="http://localhost:3000/password/resetpassword/{{params.role}}">Reset Password</a></button>
                  </body>
                  </html>`,
            })
        return res.status(200).json({ message: 'Mail has been send' })
        }else{
            res.status(404).json({ message: 'User not found' });
        }

    } catch (error) {
        console.log(error)
        return res.status(403).json({ success: false, message: 'something went wrong' })
    }

}
exports.ForgotPasswordLink = async (req, res) => {
    try {
        const id= req.params.id
        res.status(200).send(`<html>
       <script>
           function formsubmitted(e){
               e.preventDefault();
               console.log('called')
           }
       </script>
       <form action='/password/updatepassword/${id}' method="POST">
           <label for="newpassword">Enter New password</label>
           <input name="newpassword" type="password" required></input>
           <button>reset password</button>
       </form>
    </html>`)
    res.end()
        console.log('form of reset password with link send to user')
        
    } catch (error) {
        res.status(404).json({message: "user not found"})
    }

}

exports.resetpassword = async (request, response, next) => {
    try {
        const newpassword = request.body.newpassword;
        const id=request.params.id
        console.log('new password',newpassword,'user id that is in forgot table',id)
        const passwordreset = await ForgotPassword.findByPk(id);
        console.log('link active',passwordreset.active)
        const currentTime = new Date();
        const createdAtTime = new Date(passwordreset.createdAt);
        const timeDifference = currentTime - createdAtTime;
        const timeLimit = 5 * 60 * 1000; 
        console.log(timeDifference,timeLimit)
        if(timeDifference <= timeLimit && passwordreset.active==true ){
            passwordreset.update({ active: false })
            const hashedPassword = await bcrypt.hash(newpassword, 10);
            await User.update(
                {
                    password: hashedPassword
                },
                {
                    where: { id: passwordreset.userId }
                }
            );
            response.status(200).json('Password reset successful.');
        }else{
            console.log('false')
            response.status(403).json( "Link is expired");
        }
    } catch (error) {
        console.error("Error resetting password:", error);
        response.status(500).json({ message: "Internal server error" });
    }
}
