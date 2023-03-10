const mongoose = require("mongoose");

const userdata = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: [true, "course Name (courseName) is required"],
    },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("course", userdata);
