const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userdata = new mongoose.Schema(
  {
    questions: [
      {
        type: ObjectId,
        ref: "question",
      },
    ],
    category: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Description (description) is required"],
    },
    title: {
      type: String,
      required: [true, "title (title) is required"],
    },
    amount: {
      type: Number,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    attemptBy: [
      {
        type: ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("test", userdata);
