const mongoose = require("mongoose");

const userdata = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("faq", userdata);
