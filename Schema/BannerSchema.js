const mongoose = require("mongoose");

const userdata = new mongoose.Schema(
  {
    link: String,
  },
  { timestamps: true }
);

module.exports = new mongoose.model("banner", userdata);
