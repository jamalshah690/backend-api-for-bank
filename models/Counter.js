const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sequence: { type: Number, default: 10000000 }
});

module.exports = mongoose.model("Counter", counterSchema);
