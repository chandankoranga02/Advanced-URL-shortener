const express = require('express')
const Login_route = express.Router()

const Controller = require('../controllers/Login_controller')
const JWT = require('../middlewares/JWT_auth')

Login_route.post('/', Controller.Login_post)

module.exports = Login_route;