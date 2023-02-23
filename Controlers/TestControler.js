const bcrypt = require("bcrypt");
const { validateUserDetail } = require("../Middlewares/AuthMiddleware");
const SendError = require("../Middlewares/Response");
const User = require("../Schema/User");
const validator = require("../Middlewares/Validator");
const Test = require("../Schema/Test");
const Question = require("../Schema/Question");

const createTest = async (req, res, next) => {
  const testData = req.body;
  const { category, title, description, amount, isPaid } = testData;
  try {
    if (!validator.isValid(category)) {
      return res
        .status(400)
        .send({ status: false, message: "category is required" });
    }
    if (!validator.isValid(title)) {
      return res
        .status(400)
        .send({ status: false, message: "title is required" });
    }
    if (!validator.isValid(description)) {
      return res
        .status(400)
        .send({ status: false, message: "description is required" });
    }

    if (!validator.isValid(isPaid)) {
      return res
        .status(400)
        .send({ status: false, message: "isPaid is required" });
    }
    if (isPaid == "true") {
      if (!validator.isValid(amount)) {
        return res
          .status(400)
          .send({ status: false, message: "amount is required" });
      }
    }

    const savedData = await Test.create(testData);
    res
      .status(200)
      .send({ success: true, message: "Test Created", data: savedData._doc });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const getTest = async (req, res, next) => {
  try {
    const test = await Test.find(req.query).populate("questions");
    if (test.length == 0) {
      return res.status(400).send({ success: false, message: "No Data Found" });
    }
    res
      .status(200)
      .send({ success: true, message: "Test Data fetched", data: test });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const addQuestionInTest = async (req, res, next) => {
  try {
    const { testId, QuestionIds } = req.body;
    if (!validator.isValid(testId)) {
      return res
        .status(400)
        .send({ status: false, message: "testId is required" });
    }
    if (!validator.isValid(QuestionIds)) {
      return res
        .status(400)
        .send({ status: false, message: "QuestionIds are required" });
    }
    const updated = await Test.findByIdAndUpdate(
      testId,
      { questions: QuestionIds },
      { new: true }
    );
    res.status(400).send({ success: true, message: "Test updated", updated });
  } catch (e) {
    SendError(res, e);
  }
};
module.exports = {
  getTest,
  createTest,
  addQuestionInTest,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
