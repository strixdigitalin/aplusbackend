const bcrypt = require("bcrypt");
const { validateUserDetail } = require("../Middlewares/AuthMiddleware");
const SendError = require("../Middlewares/Response");
const User = require("../Schema/User");
const validator = require("../Middlewares/Validator");
const Test = require("../Schema/Test");
const Categories = require("../Schema/Categories");
const BlogSchema = require("../Schema/BlogSchema");
const MockTest = require("../Schema/MockTest");

const startMockTest = async (req, res) => {
  try {
    const { userId, testId } = req.body;
    if (!userId || !testId)
      return res
        .status(400)
        .send({ success: false, message: "testId, userId both are required" });
    const savedData = await MockTest.create({
      user: userId,
      test: testId,
    });
    res
      .status(200)
      .send({ success: true, message: "Session Created", data: savedData });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ success: false, message: error.message, data: [] });
  }
};

module.exports = {
  startMockTest,
};
