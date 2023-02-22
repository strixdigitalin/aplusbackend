const mongoose = require("mongoose");

const userdata = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name (firstName) is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name (lastName) is required"],
    },
    email: {
      type: String,
      required: [true, "Email (email) is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    tests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "test",
      },
    ],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("user", userdata);
