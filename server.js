const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
const myOAuth2Client = new OAuth2(
"687808892049-shvhtsb2hmdin8it1p4vqbbamqcjs70l.apps.googleusercontent.com",
"UxC_r13l9X2qm3oPOsYXEA6o",
"https://developers.google.com/oauthplayground"
)
app.listen(PORT, function (req, res) {
console.log(`Listening on port ${PORT}`);
})

myOAuth2Client.setCredentials({
refresh_token:"1//04NPe2qBcqb7VCgYIARAAGAQSNwF-L9Irf4PrCRwPRQG-qH2nlIG8VhowOEm0e4U3uA39L1hXeqY2EiYj46GYUS_DGQ4IHpGA84o"
});    //setting the credentials
const myAccessToken = myOAuth2Client.getAccessToken()

const transport = nodemailer.createTransport({
     service: "gmail",
     auth: {
          type: "OAuth2",
          user: "hasshamdanial1999@gmail.com", // my gmail account
          clientId: "687808892049-shvhtsb2hmdin8it1p4vqbbamqcjs70l.apps.googleusercontent.com",  //client id as generated.
          clientSecret: "UxC_r13l9X2qm3oPOsYXEA6o",
          refreshToken: "1//04NPe2qBcqb7VCgYIARAAGAQSNwF-L9Irf4PrCRwPRQG-qH2nlIG8VhowOEm0e4U3uA39L1hXeqY2EiYj46GYUS_DGQ4IHpGA84o",
          accessToken: myAccessToken //access token variable we defined earlier
     }});
app.post('/sendemail', function(req,res) {   //api end point is /sendmail.
const mailOptions = {
from: 'youremailaddresshere@email.com', // sender
to: req.body.email, // receiver
subject: 'This is my assignment', // Subject
html: '<p>You have received this email using nodemailer, you are welcome ;)</p>'// html body
}
transport.sendMail(mailOptions,function(err,result){  //sending the mail.
if(err){
res.send({
message:err
})
}else{
transport.close();
res.send({
message:'Email has been sent: check your inbox!' // Will recive this message.
})
}
})
})

//have checked it in postman.enter your gmail in the raw field and in double quotes and your message is send to the email address.