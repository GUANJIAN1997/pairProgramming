var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var User = require('../models/user')
var Step = require('../models/step')

mongoose.connect('mongodb://127.0.0.1:27017/pairprogramming',{useNewUrlParser:true, useUnifiedTopology: true},function(err){
  if(err){
    console.log('Connection Error:' + err)
  }else{
    console.log('Connection success!')
  }
})

// mongoose.connection.on('connected', function () {
//   console.log('MongoDB connected success')
// })
// mongoose.connection.on('error', function () {
//   console.log('MongoDB connected fail')
// })
// mongoose.connection.on('disconnected',function () {
//   console.log('MongoDB connected disconnected')
// })

/* GET users listing. */
router.post('/', function (req, res, next) {
  var gender = req.body.gender, userName = req.body.userName, seatNum = req.body.seatNum, userPwd = req.body.userPwd
  var params = {
    seatNum: seatNum,
    userPwd: userPwd
  }
  User.updateOne(params, {userName: userName, gender: gender}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc.n) {
        res.cookie('userName', userName, {
          path: '/',
          maxAge: 24*60*60*1000
        });
        res.cookie('seatNum', seatNum, {
          path: '/',
          maxAge: 24*60*60*1000
        });
        res.json({
          status: '0',
          msg: '更新成功',
          result: ''
        })
      } else {
        res.json({
          status: '1',
          msg: 'item not found',
          result: ''
        })
      }
    }
  })
})

router.post('/questionnaire', function (req, res, next) {
  var talkative = req.body.talkative, like = req.body.like, seatNum = req.cookies.seatNum
  User.updateOne({seatNum: seatNum},{questionnaire:[{talkative:talkative,like:like}]}, function (err, doc) {
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
  let stepsNum = req.query.stepsNum
  Step.findOne({stepsNum: stepsNum}, function (err,doc) {
    if (err) {
      res.json({
        status: '1',
        msg: res.message,
        result: ''
      })
    } else if (!doc){
      res.json({
        status: '0',
        msg: '',
        // result: doc.imgAddr
        result: 'not found'
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

router.post('/stepProject/updateProgress',function (req,res,next) {
  var seatNum = req.body.seatNum, progress = req.body.progress
  User.updateOne({seatNum: seatNum},{progress: progress}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: res.message,
        result: ''
      })
    } else if (!doc.n) {
      res.json({
        status: '1',
        msg: 'not found',
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

router.post('/stepProject/getProgress', function (req,res,next) {
  var seatNum = req.body.seatNum
  User.findOne({seatNum: seatNum}, function (err,doc) {
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
        result: doc.progress
      })
    }
  })
})

router.get('/stepProject/getOthersProgress', function (req,res,next) {
  var seatNum = req.cookies.seatNum
  User.find({userName:{$ne:''},seatNum:{$ne:seatNum}}, function (err,doc) {
    if (err) {
      res.json({
        status: '1',
        msg: res.message,
        result: ''
      })
    } else if (!doc) {
      res.json({
        status: '1',
        msg: 'not found',
        result: ''
      })
    } else {
      let othersProgressList = []
      let content = {}
      for (let i of doc) {
        content.seatNum = i.seatNum
        content.userName = i.userName
        content.gender = i.gender
        content.progress = i.progress
        content.discussionTimes = i.discussionTimes
        othersProgressList.push(content)
        content = {}
      }

      res.json({
        status: '0',
        msg: '',
        result: othersProgressList
      })
    }
  })
})

router.post('/updateDiscussionTimes', function (req,res,next) {
  var discussionPartner = req.body.discussionPartner, userName = req.body.userName
  User.updateOne({userName:userName}, {$inc:{discussionTimes:1}},function (err,doc) {
    if (!err && doc.n) {
      User.updateOne({userName: discussionPartner}, {$inc:{discussionTimes:1}}, function (err1, doc1) {
        if (!err1 && doc1.n) {
          res.json({
            status: '0',
            msg: '',
            result: ''
          })
        } else {
          res.json({
            status: '1',
            msg: '',
            result: ''
          })
        }
      })
    }
  })
})

router.post('/updateDiscussionInfor', function (req,res,next) {
  var discussionPartner = req.body.discussionPartner, stepsNum = req.body.stepsNum, feedbackValue = req.body.feedbackValue, userName = req.body.userName
  User.updateOne({userName: userName}, {$push:{discussionDetails:[{discussionPartner:discussionPartner, stepsNum: stepsNum, feedbackValue: feedbackValue}]}}, function (err, doc) {
    if (!err && doc.n) {
      res.json({
        status: '0',
        msg: '',
        result: ''
      })
    } else {
      res.json({
        status: '1',
        msg: '',
        result: ''
      })
    }
  })
})

var waitingList = []

router.post('/callTA', function (req, res, next) {
  waitingList.push(req.body.userName)
  console.log(waitingList)
  res.json({
    status: '0',
    msg: '',
    result: ''
  })
})


module.exports = router
