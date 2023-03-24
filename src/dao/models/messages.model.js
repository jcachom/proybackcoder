let mongoose = require("mongoose");
const modelCollection = "messages";
const modelSchema = new mongoose.Schema({
 
   
  email: {
    type: String,
    require: true
  },
  message: {
    type: String,
    require: true
  }

 
});

const messageModel = mongoose.model(modelCollection, modelSchema);

module.exports = messageModel;
