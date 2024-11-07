const nodemailer = require("nodemailer");
const dotenv=require("dotenv")

dotenv.config()

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS
    }
});

// async..await is not allowed in global scope, must use a wrapper
async function sendotp(otp,mail) {
//   send mail with defined transport object
//   console.log(otp,mail)
  const sendmail = {
    from: process.env.AUTH_USER, // sender address
    to: `${mail}`, // list of receivers
    subject: "OTP for Forget Password", // Subject line
    text: `${otp}`, // plain text body
  }
  console.log(sendmail);
  
  transporter.sendMail(sendmail,function(err,res){
    if(err){
        console.log("error",err)
    }else{
        console.log("response",res)
    }
  })
  console.log("--------------------------------------------------------------------------------")

//   console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports=sendotp