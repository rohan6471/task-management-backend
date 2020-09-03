'use strict'
const User = use("App/Models/User");
const nodemailer = require('nodemailer');

class UserController {
    async login({ request, response, auth }) {
        
        const k = await User.query().where("email", request.body.email).where("password",request.body.password).fetch();
        console.log(k.toJSON().length)

        if (k.toJSON().length > 0) {
                 return response.status(200).json({
                    message: "success",
                    role: k.toJSON().role
                   
                });
        }
        else {
            return response.json({
                message: "failure"
            })
        }
    }

    async forgotPassword({ request, response, auth }) {
        const { email } = request.body;
        const userRecord = await User.query().where("email", "=", email).fetch();
        console.log(userRecord.toJSON()[0])
        if (userRecord.toJSON().length > 0) {
            try {
                console.log("enteredd")
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                        auth: {
                        user: 'rakeshgoud0604@gmail.com',
                        pass: 'collegebag6471.'
                    },
                   
                   
                });
                var mailOptions = {
                    from: 'rakeshgoud0604@gmail.com',
                    to: email,
                    subject: 'Set Password',
                    html: `<p style="font-size:18px; font-weight:bold;">Hi ${userRecord.toJSON()[0].firstName},</p><p style="font-size:18px;">You recently requested a new password. Click on the link below to continue your password reset.</p> <a href="http://localhost:3000/Reset" style="background-color: #008CBA;
                    border: none;
                    color: white;
                    padding: 15px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;">Reset Password</a><br/>
                    <p style="font-size:12px;"> If you did not request a new password, please ignore this message.`,
                    text: '' 
                }
                 await transporter.sendMail(mailOptions, (error, info) => {
                    console.log("enteredd")
                    if (error) {                       
                        console.log("entered eroror",error)
                        return response.status(401).json({
                            error: {
                                status: 401,
                                message: "Please check email correctly",
                            },
                        });
                    }
                    else {
                        console.log("entereddsuccess",response.data)
                        return response.status(200).send({
                            message: "Success"
                        });                        
                    }
                });    
                return response.status(200).send({
                    message: "Success"
                });                               
            }
            catch (e) {
                console.log(e)
            }
        }        
        else {
            console.log("entereroor")
            return response.json({
                message: "error",

            });
        }
    }

    async newPassword({ request, response, auth }) {       
        const newPassword = request.body;        
        const userRecord = await User.findBy('email', newPassword.email)
       
        if (userRecord != null) {            
            userRecord.password = newPassword.newpassword;            
            await userRecord.save();
            return response.json({
                status: 'success',
                message: "Password success"
            })
        } 
        else {
            return response.json({
              message: "check email correctly",
            });
        }
    

    }

    async logout({ response }) {
        logger.debug("AuthController-logout function executed successfully");
        return response.status(200).json({
            status: 200,
            message: "logout successfull",
        });
    }
   
}
    
module.exports = UserController

   