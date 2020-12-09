var mongoose = require('mongoose')
var stepSchema = new mongoose.Schema({
  "stepsNum": Number,
  "imgAddr": String,
  "content": String
});


module.exports = mongoose.model("Step",stepSchema)
