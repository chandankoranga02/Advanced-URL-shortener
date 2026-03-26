const express = require('express')
const SignUP_route = express.Router()

const Controller = require('../controllers/SignUP_controller')
const validator = require('../middlewares/signUP_validator')


SignUP_route.post('/', validator.signup_validation , Controller.SignUP_post)

module.exports = SignUP_route;