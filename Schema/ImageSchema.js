const mongoose = require("mongoose");

const userdata = new mongoose.Schema(
  {
    type: String,
    filename: String,
  },
  { timestamps: true }
);

module.exports = new mongoose.model("questionimage", userdata);
