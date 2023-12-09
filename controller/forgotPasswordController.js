
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


exports.resetpasswordform = async (request, response, next) => {
    try {
        let id = request.params.id;
        const passwordreset = await ForgotPassword.findByPk(id);
        if (passwordreset.isactive) {
            passwordreset.isactive = false;
            await passwordreset.save();
            response.sendFile('resetpassword.html', { root: 'views' })
        } else {
            return response.status(401).json({ message: "Link has been expired" })
        }

    } catch (error) {

    }
}

exports.forgotPasswordMail = async (req, res) => {
    try {
        const { name, email, contact } = req.body
        console.log(name, email, contact)

        const user = await User.findOne({ where: { email:email} })
        if (user) {
        const sender = {
            email: 'wilsondynamic3@gmail.com',
            name: 'Expence Tracker Pvt ltd',
        }

        const receivers = [
            {
                email: email,
            },
        ]

        const resetresponse=await user.createForgotPassword({})
        const id=resetresponse
        const tranEmailApi = new Sib.TransactionalEmailsApi()
        const mailresponse=await tranEmailApi
            .sendTransacEmail({
                sender,
                to: receivers,
                subject: 'Reset your password for Expence Tracker',
                textContent: `Hello ${name} you have raised a request for reset/change your password`,
                htmlContent:  `
                <!DOCTYPE html>
                  <html>
                  <head>
                      <title>Password Reset</title>
                  </head>
                  <body>
                      <h1>Reset Your Password</h1>
                      <p>Click the button below to reset your password:</p>
                      <button><a href="http://localhost:3000/password/resetpassword/${id}">Reset Password</a></button>
                  </body>
                  </html>`, params: {
                      role: id
                  }
                ,
            })
        return res.status(200).json({ message: 'Mail has been send' })
        }else{
            response.status(404).json({ message: 'User not found' });
        }

    } catch (error) {
        console.log(error)
        return res.status(403).json({ success: false, message: 'something went wrong' })
    }

}
exports.ForgotPasswordLink = async (req, res) => {
    const id = req.params.id;
    const forgetpasswordrequest = await ForgotPassword.findOne({ where: { id } })
    if (forgetpasswordrequest) {
        forgetpasswordrequest.update({ active: false })
    }
    res.status(200).send(`<html>
   <script>
       function formsubmitted(e){
           e.preventDefault();
           console.log('called')
       }
   </script>
   <form action="/password/updatepassword/${id}" method="POST">
       <label for="newpassword">Enter New password</label>
       <input name="newpassword" type="password" required></input>
       <button>reset password</button>
   </form>
</html>`)
res.end()
    console.log('form of reset password with link send to user')
}

exports.resetpassword = async (request, response, next) => {
    console.log(request.body.newpassword,request.params.id)

    // try {
    //     const { resetid, newpassword } = request.body;
    //     const passwordreset = await ForgotPasswords.findByPk(resetid);
    //     const currentTime = new Date();
    //     const createdAtTime = new Date(passwordreset.createdAt);
    //     const timeDifference = currentTime - createdAtTime;
    //     const timeLimit = 5 * 60 * 1000; 
    //     if(timeDifference <= timeLimit){
    //         const hashedPassword = await bcrypt.hash(newpassword, 10);
    //         await User.update(
    //             {
    //                 password: hashedPassword
    //             },
    //             {
    //                 where: { id: passwordreset.UserId }
    //             }
    //         );
    //         response.status(200).json({ message: "Password reset successful." });
    //     }else{
    //         response.status(403).json({ message: "Link has expired"});
    //     }



    // } catch (error) {
    //     console.error("Error resetting password:", error);
    //     response.status(500).json({ message: "Internal server error" });
    // }
}
