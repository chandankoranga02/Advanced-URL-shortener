const express = require('express')
const SignUP_route = express.Router()

const Controller = require('../controllers/Login_controller')

SignUP_route.get('/', Controller.SignUP_Get)
SignUP_route.post('/', Controller.SignUP_post)

exports.module = SignUP_route;