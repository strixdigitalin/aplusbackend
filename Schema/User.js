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
      unique: [true, "User already registered using this email"],
      required: [true, "Email (email) is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: ["student", "admin"],
    },
    tests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "test",
      },
    ],
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subscription",
    },
    subscriptionDuration: {
      startDate: Date,
      duration: {
        type: String,
        enum: ["1month", "3month", "6month", "yearly"],
      },
      endDate: Date,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("user", userdata);
