const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userdata = new mongoose.Schema(
  {
    test: {
      type: ObjectId,
      ref: "test",
    },
    user: {
      type: ObjectId,
      ref: "user",
    },
    isSubmitted: {
      type: Boolean,
      default: false,
    },
    answers: [
      {
        question: { type: ObjectId, ref: "question" },
        response: Number,
      },
    ],
    result: {},
  },
  { timestamps: true }
);

module.exports = new mongoose.model("mocktest", userdata);
