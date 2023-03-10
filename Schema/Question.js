const mongoose = require("mongoose");

const userdata = new mongoose.Schema(
  {
    Sr: { type: Number },
    english: {
      isImage: {
        type: String,
        default: null,
      },
      question: {
        type: String,
        required: [true, "Question in english is required"],
      },
      options: [
        {
          isImage: {
            type: String,
            default: null,
          },
          option: String,
        },
      ],
    },
    hindi: {
      isImage: {
        type: String,
        default: null,
      },
      question: {
        type: String,
        required: [true, "Question in hindi is required"],
      },
      options: [
        {
          isImage: {
            type: String,
            default: null,
          },
          option: String,
        },
      ],
    },

    correctAnswer: {
      type: Number,
      required: [true, "Correct option is required"],
    },
    level: {
      type: String,
      required: [true, "Level is required"],
    },
    topic: {
      type: String,
      required: [true, "Topic is required"],
    },
    section: {
      type: String,
      required: [true, "Section is reqired"],
    },
    solution: {
      type: String,
      default: null,
    },
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "test",
      required: [true, "Test Id is required"],
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("question", userdata);
