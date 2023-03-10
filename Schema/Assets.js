const mongoose = require("mongoose");

const userdata = new mongoose.Schema(
  {
    banner: [{ type: String }],
    logo: { type: String },
    pdf: { type: String },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("asset", userdata);
