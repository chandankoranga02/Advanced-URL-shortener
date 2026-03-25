// npm external Module
const express = require('express')

// local module
const database = require('./config/MongoDB_setup')
const Login_route = require('./routes/Login_route')
const SignUp_route = require('./routes/SignUP_route')


const app =  express()


app.use('/login', Login_route)
app.use('/signup', SignUp_route)



const PORT = 5000;
app.listen(PORT , database, console.log("server is running at PORT 5000"))