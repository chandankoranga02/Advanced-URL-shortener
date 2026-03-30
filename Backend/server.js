// npm external Module
const express = require('express')
require("dotenv").config();

// local module
const database = require('./config/MongoDB_setup')
const Login_route = require('./routes/Login_route')
const SignUp_route = require('./routes/SignUP_route')
const JWT_login = require('./routes/Auth/JWT_login')
const API_shortner =  require('./routes/response')
const Redirect_route = require('./routes/redirect_window')

const app =  express()
app.use(express.json());


app.use('/login', Login_route)
app.use('/signup', SignUp_route)
app.use('/home/dahsboard', JWT_login)
app.use('/api/shortern/', API_shortner)
app.use('/', Redirect_route)



const PORT = 5000;
database();
app.listen(PORT , ()=> { console.log("server is running at PORT 5000")})