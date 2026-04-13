const express = require('express')
const Redirect_route = express.Router()
const controller = require('../controllers/redirect_window')
const controller_verify = require('../controllers/Auth/verify_link')
const rateLimiter = require('../middlewares/rateLimiter')

Redirect_route.get('/:Shortcode', rateLimiter.redirectLimiter , controller.Redirect_window)
Redirect_route.post('/verify/:shortcode', rateLimiter.verifyLimiter, controller_verify.verified_password)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

module.exports = Redirect_route;