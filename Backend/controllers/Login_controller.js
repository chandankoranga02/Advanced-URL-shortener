const bcrypt = require('bcrypt')
const login_logs = require('../models/Login_data')
const Login = require('../models/FormData')


exports.Login_post = async (req,res) => {
   const { email , password } =  req.body;
   const Login_email =  await Login.findOne({email : email})

   if(!Login_email){ return res.status(400).send({msg : " Invalid Credentials , please Enter correct email and password"})}

   const matched = await bcrypt.compare(password, Login_email.password)

   if(!matched){
      const Failed_to_logedIn  =  new login_logs({
         LogedInBy: Login_email._id,
         IpAddress : req.headers['x-forwarded-for'] || req.socket.remoteAddress,
         DeviceInfo : req.headers['user-agent'],
         status : "FAILED"
       }) 

       await  Failed_to_logedIn.save()
       return res.status(400).send({msg  : "Login failed , Invalid credentials "})
   }

   if(Login_email || matched){
      
       const successfully_logedIn  =  new login_logs({
         LogedInBy: Login_email._id,
         IpAddress : req.headers['x-forwarded-for'] || req.socket.remoteAddress,
         DeviceInfo : req.headers['user-agent'],
         status : "SUCCESS"
       }) 

       await successfully_logedIn.save()

       
        return res.status(201).send({msg  : "Login failed , Invalid credentials "})
   }
}
