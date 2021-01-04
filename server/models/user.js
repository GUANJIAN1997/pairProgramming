var mongoose = require('mongoose')
var userSchema = new mongoose.Schema({
  "userId": String,
  "userName": String,
  "seatNum": String,
  "userPwd": String,
  "gender": String,
  "progress": Number,
  "discussionTimes": Number,
  "discussionDetails": [],
  "checkDetails": [],
  "questionnaire": [{
    "talkative": String,
    "like": String
  }
  ]
});


module.exports = mongoose.model("User",userSchema)
