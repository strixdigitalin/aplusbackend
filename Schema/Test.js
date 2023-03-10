const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userdata = new mongoose.Schema(
  {
    category: {
      type: ObjectId,
      ref: "category",
    },
    subCategory: {
      type: ObjectId,
      ref: "subcategory",
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
    course: {
      type: ObjectId,
      ref: "course",
    },
    cutOff: {
      type: Number,
    },
    totalTime: {
      type: Number,
    },
    totalQuestions: {
      type: Number,
    },
    totalMarks: {
      type: Number,
    },
    permissionToSwitch: {
      type: Boolean,
    },
    sections: [],

    attemptBy: [
      {
        type: ObjectId,
        ref: "user",
      },
    ],
    result: [
      {
        type: ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("test", userdata);
