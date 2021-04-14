var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var User = require('../models/user')
var Step = require('../models/step')
var util = require('../util/radom')

mongoose.connect('mongodb://root:199783gj@127.0.0.1:27017/exp',{useNewUrlParser:true, useUnifiedTopology: true},function(err){
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

// router.post('/stepProject/updateProgress',function (req,res,next) {
//   var seatNum = req.body.seatNum, progress = req.body.progress
//   User.updateOne({seatNum: seatNum},{progress: progress}, function (err, doc) {
//     if (err) {
//       res.json({
//         status: '1',
//         msg: res.message,
//         result: ''
//       })
//     } else if (!doc.n) {
//       res.json({
//         status: '1',
//         msg: 'not found',
//         result: ''
//       })
//     } else {
//       res.json({
//         status: '0',
//         msg: '',
//         result: ''
//       })
//     }
//   })
// })

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


const discussionList = []

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
        msg1: discussionList,
        msg2: checkList,
        result: othersProgressList
      })
    }
  })
})


router.post('/updateDiscussionList', function (req, res, next) {
  const seatNum_teaching = req.body.seatNum_teaching, seatNum_learning = req.body.seatNum_learning
  if (discussionList.indexOf(seatNum_learning) == -1) {
    discussionList.push(seatNum_teaching, seatNum_learning)
    res.json({
      status: '0',
      msg: '',
      result: ''
    })
    console.log('------------------------discussionListConfirm-------------------------')
    console.log(discussionList)
    console.log('----------------------------------------------------------------------')
  } else {
    res.json({
      status: '1',
      msg: '',
      result: ''
    })
    console.log('------------------------discussionListConfirm-------------------------')
    console.log(discussionList)
    console.log('----------------------------------------------------------------------')
  }


})

router.post('/deleteDiscussionList', function (req, res, next) {
  const seatNum_teaching = req.body.seatNum_teaching, seatNum_learning = req.body.seatNum_learning
  //修正如果服务器关了之后学生没讨论完 注意discussionList.indexOf(seatNum_teaching)为-1的情况
  // discussionList.splice(discussionList.indexOf(seatNum_teaching),1)
  let index_learning = discussionList.indexOf(seatNum_learning)
  let index_teaching = index_learning - 1
  discussionList.splice(index_learning,1)
  discussionList.splice(index_teaching,1)
  res.json({
    status: '0',
    msg: '',
    result: ''
  })
  console.log('------------------------discussionListAfterDeleted-------------------------')
  console.log(discussionList)
  console.log('---------------------------------------------------------------------------')
})

router.post('/discussionChildListConfirm', function (req, res, next) {
  var discussionChildList = req.body.discussionChildList
  console.log(discussionChildList)
  if (discussionChildList.length === 1) {
    if (discussionList.indexOf(discussionChildList[0].seatNum) > -1) {
      res.json({
        status: '1',
        msg: '',
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: discussionChildList[0]
      })
    }
  } else {
    var sorted = discussionChildList.sort(function (a, b) {
      return a.discussionTimes - b.discussionTimes
    })
    for (let item of sorted) {
      if (discussionList.indexOf(item.seatNum) === -1) {
        return res.json({
          status: '0',
          msg: '',
          result: item
        })
      }
    }
    res.json({
      status: '1',
      msg: '',
      result: ''
    })
  }

})

const checkPwdList = []

router.post('/checkChildListConfirm', function (req, res, next) {
  var checkChildList = req.body.checkChildList
  console.log(checkChildList)
  if (checkChildList.length === 1) {
    if ((discussionList.indexOf(checkChildList[0].seatNum) > -1) || (checkList.indexOf(checkChildList[0].seatNum) > -1)) {
      res.json({
        status: '1',
        msg: '',
        result: ''
      })
    } else {
      const checkPwd = util.random(100000,999999).toString()
      checkPwdList.push(checkPwd)
      console.log(checkPwdList)
      res.json({
        status: '0',
        msg: checkPwd,
        result: checkChildList[0]
      })
    }
  } else {
    const sorted = checkChildList.sort(function (a, b) {
      return a.discussionTimes - b.discussionTimes
    })
    for (let item of sorted) {
      if ((discussionList.indexOf(item.seatNum) === -1 && (checkList.indexOf(item.seatNum) === -1)) ) {
        const checkPwd = util.random(100000,999999).toString()
        checkPwdList.push(checkPwd)
        console.log(checkPwdList)
        return res.json({
          status: '0',
          msg: checkPwd,
          result: item
        })
      }
    }
    res.json({
      status: '1',
      msg: '',
      result: ''
    })
  }

})

router.post('/checkPwdListConfirm', function (req, res, next) {
  let checkPwd = req.body.checkPwd
  let index = checkPwdList.indexOf(checkPwd)
  if (index === -1) {
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

const checkList = []

router.post('/updateCheckList', function (req, res, next) {
  const seatNum_teaching = req.body.seatNum_teaching, seatNum_learning = req.body.seatNum_learning
  if (checkList.indexOf(seatNum_learning) == -1) {
    checkList.push(seatNum_teaching, seatNum_learning)
    res.json({
      status: '0',
      msg: '',
      result: ''
    })
    console.log('------------------------checkListConfirm-------------------------')
    console.log(checkList)
    console.log('----------------------------------------------------------------------')
  } else {
    res.json({
      status: '1',
      msg: '',
      result: ''
    })
    console.log('------------------------checkListConfirm-------------------------')
    console.log(checkList)
    console.log('----------------------------------------------------------------------')
  }
})

router.post('/deleteCheckList', function (req, res, next) {
  const seatNum_teaching = req.body.seatNum_teaching, seatNum_learning = req.body.seatNum_learning
  //修正如果服务器关了之后学生没讨论完 注意discussionList.indexOf(seatNum_teaching)为-1的情况
  // discussionList.splice(discussionList.indexOf(seatNum_teaching),1)
  let index_learning = checkList.indexOf(seatNum_learning)
  let index_teaching = index_learning - 1
  checkList.splice(index_learning,1)
  checkList.splice(index_teaching,1)
  res.json({
    status: '0',
    msg: '',
    result: ''
  })
  console.log('------------------------checkListAfterDeleted-------------------------')
  console.log(checkList)
  console.log('---------------------------------------------------------------------------')
})

router.post('/updateDiscussionTimes', function (req,res,next) {
  var seatNum_teaching = req.body.seatNum_teaching, seatNum_learning = req.body.seatNum_learning
  User.updateOne({seatNum:seatNum_learning}, {$inc:{discussionTimes:1}},function (err,doc) {
    if (!err && doc.n) {
      User.updateOne({seatNum: seatNum_teaching}, {$inc:{discussionTimes:1}}, function (err1, doc1) {
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
  let seatNum_teaching = req.body.seatNum_teaching, stepsNum = req.body.stepsNum, feedbackValue = req.body.feedbackValue, seatNum_learning = req.body.seatNum_learning
  let startTime = req.body.startTime, endTime = req.body.endTime
  User.updateOne({seatNum: seatNum_learning}, {$push:{discussionDetails:[{
    seatNum_teaching:seatNum_teaching,
    stepsNum: stepsNum,
    feedbackValue: feedbackValue,
    startTime: startTime,
    endTime: endTime}]}}, function (err, doc) {
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

router.post('/updateCheckInfor', function (req,res,next) {
  var checkPartnerSeatNum = req.body.checkPartnerSeatNum, stepsNum = req.body.stepsNum, result = req.body.result, seatNum = req.body.seatNum, time = req.body.time
  User.updateOne({seatNum: seatNum}, {$push:{checkDetails:[{checkPartnerSeatNum:checkPartnerSeatNum, stepsNum: stepsNum, result: result, time: time}]}}, function (err, doc) {
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

router.get('/getAllProgress', function (req,res,next) {
  User.find({userName:{$ne:''}}, function (err,doc) {
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
      let ProgressList = []
      let content = {}
      for (let i of doc) {
        content.seatNum = i.seatNum
        content.userName = i.userName
        content.progress = i.progress
        content.discussionTimes = i.discussionTimes
        ProgressList.push(content)
        content = {}
      }

      res.json({
        status: '0',
        msg: '',
        result: ProgressList
      })
    }
  })
})

var waitingList = []
router.post('/callTA', function (req, res, next) {
  let item = {}
  item.seatNum = req.body.seatNum
  item.userName = req.body.userName
  if (!(waitingList.some((i) => {return i.seatNum === item.seatNum}))){
    waitingList.push(item)
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
  console.log('-------------------------waitingList------------------------')
  console.log(waitingList)
  console.log('------------------------------------------------------------')
})

router.post('/waitListConfirm', function (req, res, next) {
  if (waitingList.length) {
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

router.get('/getWaitList', function (req,res,next) {
  if (waitingList.length) {
    res.json({
      status: '0',
      msg: '',
      result: waitingList.shift()
    })
  } else {
    res.json({
      status: '1',
      msg: '',
      result: ''
    })
  }
})


router.get('/getContent', function (req,res,next) {
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
        result: 'not found'
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc.content
      })
    }
  })
})

router.post('/kakinaoshi', function (req, res, next) {
  let checkPwd = req.body.checkPwd
  let index = checkPwdList.indexOf(checkPwd)
  if (index > -1) {
    checkPwdList.splice(index, 1)
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

router.post('/submitCheckPwd', function (req, res, next) {
  const checkPwd = req.body.checkPwd
  const child_learning_seatNum = req.body.child_learning_seatNum
  const progress =  req.body.progress
  const index = checkPwdList.indexOf(checkPwd)
  if (index > -1) {
    checkPwdList.splice(index, 1)
    if (progress > 3) {
      res.json({
        status: '1',
        msg: '',
        result: ''
      })
    } else {
      User.updateOne({seatNum: child_learning_seatNum},{progress: progress}, function (err, doc) {
        if (err) {
          res.json({
            status: '10',
            msg: res.message,
            result: ''
          })
        } else if (!doc.n) {
          res.json({
            status: '10',
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
    }

  } else {
    res.json({
      status: '2',
      msg: '',
      result: ''
    })
  }
})


module.exports = router
