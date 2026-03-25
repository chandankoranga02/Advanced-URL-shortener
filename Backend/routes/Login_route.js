const express = require('express')
const Login_route = express.Router()

const Controller = require('../controllers/Login_controller')

Login_route.get('/', Controller.Login_Get)
Login_route.post('/', Controller.Login_post)

exports.module = Login_route;