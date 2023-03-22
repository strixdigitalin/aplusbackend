const mongoose = require("mongoose");

const userdata = new mongoose.Schema(
  {
    title: String,
    link: String,
  },
  { timestamps: true }
);

module.exports = new mongoose.model("pdfs", userdata);
