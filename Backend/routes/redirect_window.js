const express = require('express')
const Redirect_route = express.Router()
const controller = require('../controllers/redirect_window')
const controller_verify = require('../controllers/Auth/verify_link')

Redirect_route.get('/:shortcode', controller.Redirect_window)
Redirect_route.get('/verify/:shortcode', controller_verify.verified_password)


module.exports = Redirect_route;