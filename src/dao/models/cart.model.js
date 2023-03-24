let mongoose = require("mongoose");
const modelCollection = "cart";
const itemSchema = new mongoose.Schema({
  idproducto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productos",
  },
  id: {
    type: Number,
    require: true,
    minLength: 1,
  },
  quantity: {
    type: Number,
    require: true,
    min: 1,
  },
});

const modelSchema = new mongoose.Schema({
  id: Number,
  products: [itemSchema],
});

const cartModel = mongoose.model(modelCollection, modelSchema);

module.exports = cartModel;
