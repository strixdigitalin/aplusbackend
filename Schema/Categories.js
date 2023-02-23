const mongoose = require("mongoose");

const userdata = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Category Name (categoryName) is required"],
    },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("category", userdata);
