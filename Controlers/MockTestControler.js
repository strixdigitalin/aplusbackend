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
const getMockTest = async (req, res) => {
  try {
    const data = await MockTest.find(req.query).sort({ createdAt: 1 });
    res.status(200).send({ success: true, message: "All test", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, message: error.message });
  }
};

const submitAnswer = async (req, res, next) => {
  const { testId, mockId, questionId, answer } = req.body;
  // const checkExist = await MockTest.find({ "answers.question": questionId });
  const data = await MockTest.findOneAndUpdate(
    { mockId, "answers.question": questionId },
    {
      $set: {
        "answers.$.response": answer,
      },
    },
    { new: true }
  );
  if (data != null) {
    res.status(200).send({ success: true, message: "updated", data });
  } else {
    const data = await MockTest.findByIdAndUpdate(
      mockId,
      {
        $push: {
          answers: {
            question: questionId,
            response: answer,
          },
        },
      },
      { new: true }
    );
    res.status(200).send({ success: true, message: "updated", data });
  }
};
const getAnswerOfQuestion = async (req, res, next) => {
  try {
    const { questionId, mockId } = req.params;
    const data = await MockTest.findOne({
      _id: mockId,
      "answers.question": questionId,
    });
    if (data == null) {
      return res.status(200).send({
        success: true,
        message: "Not Answered",
        data,
      });
    } else {
      const answer = data.answers.filter((item) => item.question == questionId);
      res.status(200).send({
        success: true,
        message: "Answer by Answer Id",
        data: answer[0],
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Error while fetching answer" });
  }
};

const submitMockTest = async (req, res) => {
  try {
    const { mockId } = req.params;
    const data = await MockTest.findByIdAndUpdate(
      mockId,
      {
        isSubmitted: true,
      },
      { new: true }
    );
    res.status(200).send({ success: true, message: "Test End", data });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = {
  startMockTest,
  getMockTest,
  submitAnswer,
  submitMockTest,
  getAnswerOfQuestion,
};
