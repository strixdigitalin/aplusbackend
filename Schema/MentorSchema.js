const mongoose = require("mongoose");

const userdata = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category Name (categoryName) is required"],
    },
    image: String,
    description: "",
    link: "",
    date: Date,
  },
  { timestamps: true }
);

module.exports = new mongoose.model("mentorship", userdata);
