const express = require('express')
const Google_oauth_route = express.Router()
const rateLimiter = require('../middlewares/rateLimiter')
const Controller = require('../controllers/Google_controller')


Google_oauth_route.post('/', rateLimiter.loginLimiter , Controller.Google_Login)


module.exports = Google_oauth_route;