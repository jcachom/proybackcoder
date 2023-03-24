let mongoose = require("mongoose");
const modelCollection = "productos";
const modelSchema = new mongoose.Schema({
  id: Number,
  code: {
    type: String,
    require: true,
    unique: true,
    minLength: 1,
    maxLength: 10,
  },
  title: {
    type: String,
    require: true,
    minLength: 1,
  },
  description: {
    type: String,
    require: true,
    minLength: 1,
  },
  price: Number,
  status: Boolean,
  stock: Number,
  thumbnail: [String],
});

const productoModel = mongoose.model(modelCollection, modelSchema);

module.exports = productoModel;
