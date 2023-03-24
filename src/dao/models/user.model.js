let mongoose = require("mongoose");
const modelCollection = "usuarios";
const modelSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  dni: Number,
  birthDate: Date,
  gender: {
    type: String,
    enum: ["M", "F"],
  },
});

const userModel = mongoose.model(modelCollection, modelSchema);

module.exports = userModel;
