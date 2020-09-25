var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var User = require('../models/user')
var Step = require('../models/step')

mongoose.connect('mongodb://127.0.0.1:27017/pairprogramming')
mongoose.connection.on('connected', function () {
  console.log('MongoDB connected success')
})
mongoose.connection.on('error', function () {
  console.log('MongoDB connected fail')
})
mongoose.connection.on('disconnected',function () {
  console.log('MongoDB connected disconnected')
})

/* GET users listing. */
router.post('/', function (req, res, next) {
  var gender = req.body.gender, userName = req.body.userName, seatNum = req.body.seatNum, userPwd = req.body.userPwd
  var params = {
    seatNum: seatNum,
    userPwd: userPwd
  }
  User.findOne(params, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (!doc) {
        res.json({
          status: '1',
          msg: 'DBから見つからなかった',
          result: ''
        })
      } else {
        res.cookie('userName', doc.userName, {
          path: '/',
          maxAge: 1000*60*60
        });
        res.cookie('seatNum', doc.seatNum, {
          path: '/',
          maxAge: 1000*60*60
        });
        User.update({seatNum: seatNum}, {userName: userName,
        gender: gender}, function (err1, doc1) {
          if (err1) {
            res.json({
              status: '1',
              msg: '更新失敗',
              result: ''
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: '更新完了'
            })
          }
        })
      }
    }
  })
})

router.post('/questionnaire', function (req, res, next) {
  var talkative = req.body.talkative, like = req.body.like, seatNum = req.cookies.seatNum
  User.update({seatNum: seatNum},{questionnaire:[{talkative:talkative,like:like}]}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: res.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: ''
    })
    }
  })
})

router.get('/stepProject',function (req,res,next) {
  let stepsNum = req.param('stepsNum')
  Step.findOne({stepsNum:stepsNum}, function (err,doc) {
    if (err) {
      res.json({
        status: '1',
        msg: res.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc.imgAddr
      })
    }
  })
})
module.exports = router
