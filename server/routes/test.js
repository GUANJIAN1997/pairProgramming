var express = require('express')
var expressWS = require('express-ws')
var router = express.Router()
expressWS(router)
var mongoose = require('mongoose')
var User = require('../models/user')
var Step = require('../models/step')

router.ws('/',function (ws, req) {
  ws.on('message',function (msg) {


  })

}).get('/', function (req, resp) {

})

module.exports = router
