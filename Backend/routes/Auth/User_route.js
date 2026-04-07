const express = require('express');
const { verifyToken } = require('../../middlewares/JWT_auth');
const User_logged = express.Router()
const controller = require('../../controllers/Auth/User_route')


User_logged.get('/me', verifyToken, controller.get_logges_user )

module.exports = User_logged;