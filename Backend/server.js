// npm external Module
const express = require('express')
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");



// local module
const database = require('./config/MongoDB_setup')
const Login_route = require('./routes/Login_route')
const SignUp_route = require('./routes/SignUP_route')
const JWT_login = require('./routes/Auth/JWT_login')
const API_shortner =  require('./routes/response')
const Redirect_route = require('./routes/redirect_window')
const Logged_user = require('./routes/Auth/User_route')

const app =  express()
app.use(express.json());
app.use(cors({ origin : "http://localhost:3000", credentials : true }));
app.use(cookieParser());

app.use('/login', Login_route)
app.use('/signup', SignUp_route)
app.use('/home/dahsboard/', JWT_login)
app.use('/api/shortern/', API_shortner)
app.use('/', Redirect_route)
app.use('/api/', Logged_user)

const PORT = 5000;
database();
app.listen(PORT , ()=> { console.log("server is running at PORT 5000")})