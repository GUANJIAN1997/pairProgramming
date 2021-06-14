var mongoose = require('mongoose')
var stepSchema = new mongoose.Schema({
  "stepsNum": Number,
  "imgAddr": String,
  "content": String,
  "url": String
});


module.exports = mongoose.model("Step",stepSchema)
