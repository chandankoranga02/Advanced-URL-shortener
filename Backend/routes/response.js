const express = require('express')
const Response = express.Router()
const Controller =  require('../controllers/Response_API')

Response.post('/', Controller.Response_POST_API)

module.exports = Response;