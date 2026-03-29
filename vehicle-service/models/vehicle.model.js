const mongoose = require("mongoose");

module.exports = mongoose.model("Vehicle", {
  name: String,
  type: String,
  price: Number,
});