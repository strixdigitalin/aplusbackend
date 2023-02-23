const mongoose = require("mongoose");

const userdata = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question  (question) is required"],
    },
    options: [
      {
        option: String,
        isCorrect: {
          type: Boolean,
          required: [true, "In (options) field isCorrect is required"],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("question", userdata);
