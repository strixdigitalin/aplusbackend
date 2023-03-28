const mongoose = require("mongoose");

const userdata = new mongoose.Schema(
  {
    name: String,
    amount: Number,
    description: String,
    usage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("subscription", userdata);
