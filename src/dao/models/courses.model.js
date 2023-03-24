let mongoose = require("mongoose");
const modelCollection = "courses";
const modelSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  teacher: String,
});

const coursesModel = mongoose.model(modelCollection, modelSchema);

module.exports = coursesModel;
