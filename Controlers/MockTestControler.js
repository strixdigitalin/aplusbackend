const bcrypt = require("bcrypt");
const { validateUserDetail } = require("../Middlewares/AuthMiddleware");
const SendError = require("../Middlewares/Response");
const User = require("../Schema/User");
const validator = require("../Middlewares/Validator");
const Test = require("../Schema/Test");
const Categories = require("../Schema/Categories");
const BlogSchema = require("../Schema/BlogSchema");
const MockTest = require("../Schema/MockTest");
const Question = require("../Schema/Question");

const startMockTest = async (req, res) => {
  try {
    const { userId, testId } = req.body;
    if (!userId || !testId)
      return res
        .status(400)
        .send({ success: false, message: "testId, userId both are required" });
    const questions = await Question.find({ testId });
    let manageArray = questions.map((item) => {
      return {
        question: item._doc._id,
        answered: false,
        notAnswered: false,
        visited: false,
        markedReview: false,
        answeredAndReview: false,
      };
    });
    const savedData = await MockTest.create({
      user: userId,
      test: testId,
      answers: manageArray,
    });
    res.status(200).send({
      success: true,
      message: "Session Created",
      data: savedData,
      manageArray,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ success: false, message: error.message, data: [] });
  }
};
const getMockTest = async (req, res) => {
  try {
    const data = await MockTest.find(req.query)
      .populate("answers.question")
      .populate("test")
      .sort({ createdAt: 1 });
    res.status(200).send({ success: true, message: "All test", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, message: error.message });
  }
};

const submitAnswer = async (req, res, next) => {
  const { testId, mockId, questionId, answer } = req.body;
  // let markedReview
  let markedReview = false;
  if (req.body.markedReview) {
    markedReview = req.body.markedReview;
  }
  // const checkExist = await MockTest.find({ "answers.question": questionId });
  try {
    const data = await MockTest.updateOne(
      {
        _id: mockId,
        answers: {
          $elemMatch: {
            question: questionId,
          },
        },
      },
      {
        $set: {
          "answers.$.response": answer,
          "answers.$.answered": answer == null ? null : true,
          "answers.$.markedReview": markedReview,
          "answers.$.visited": true,
        },
      },
      {
        new: true,
      }
      // {
      //   $set: {
      //     "answers.$.response": answer,
      //   },
      // },
      // { new: true }
    );
    console.log(data, "<<< this is data");
    res.status(200).send({ data });
    return null;
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }

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
            answered: true,
          },
        },
      },
      { new: true }
    );
    res.status(200).send({ success: true, message: "updated", data });
  }
};
// const submitAnswer = async (req, res, next) => {
//   const { testId, mockId, questionId, answer } = req.body;
//   // const checkExist = await MockTest.find({ "answers.question": questionId });
//   try {
//     const data = await MockTest.updateOne(
//       {
//         _id: mockId,
//         answers: {
//           $elemMatch: {
//             question: questionId,
//           },
//         },
//       },
//       {
//         $set: {
//           "answers.$.response": answer,
//           "answers.$.answered": true,
//           "answers.$.visited": true,
//         },
//       },
//       {
//         new: true,
//       }
//       // {
//       //   $set: {
//       //     "answers.$.response": answer,
//       //   },
//       // },
//       // { new: true }
//     );
//     console.log(data, "<<< this is data");
//     res.status(200).send({ data });
//     return null;
//   } catch (error) {
//     res.status(400).send({ success: false, error: error.message });
//   }

//   if (data != null) {
//     res.status(200).send({ success: true, message: "updated", data });
//   } else {
//     const data = await MockTest.findByIdAndUpdate(
//       mockId,
//       {
//         $push: {
//           answers: {
//             question: questionId,
//             response: answer,
//             answered: true,
//           },
//         },
//       },
//       { new: true }
//     );
//     res.status(200).send({ success: true, message: "updated", data });
//   }
// };
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

    const mockData = await MockTest.findById(mockId).populate(
      "answers.question",
      "correctAnswer section"
    );

    // let correctAnswer = [];
    // let wrongAnswers = [];
    // mockData.answers.map((item) => {
    //   if (item.question.correctAnswer == item.response)
    //     correctAnswer = [...correctAnswer, item];
    //   else wrongAnswers = [...wrongAnswers, item];
    // });
    const checkRes = (item) => item.question.correctAnswer == item.response;
    let section1 = [];
    let section2 = [];
    let section3 = [];
    let section4 = [];
    mockData.answers.map((item) => {
      if (item.question.section == 1) {
        section1 = [
          ...section1,
          {
            question: item.question,
            response: item.response,
            _id: item._id,
            visited: item.visited,
            isCorrect: checkRes(item),
          },
        ];
      }
      if (item.question.section == 2) {
        section2 = [
          ...section2,
          {
            question: item.question,
            response: item.response,
            visited: item.visited,
            _id: item._id,
            isCorrect: checkRes(item),
          },
        ];
      }
      if (item.question.section == 3) {
        section3 = [
          ...section3,
          {
            question: item.question,
            response: item.response,
            visited: item.visited,
            _id: item._id,
            isCorrect: checkRes(item),
          },
        ];
      }
      if (item.question.section == 4) {
        section4 = [
          ...section4,
          {
            question: item.question,
            response: item.response,
            visited: item.visited,
            _id: item._id,
            isCorrect: checkRes(item),
          },
        ];
      }
    });

    const statiStics = async (oneSection, section) => {
      console.log(mockData.test, "<< this i sone section");
      const total = oneSection.length;
      const correct = oneSection.filter((item) => item.isCorrect).length;
      const inCorrect = total - correct;
      const totalQuestion = await Question.count({
        // testId: mockData.test,
        testId: `${mockData.test}`,
        section,
      });
      let send = {
        total,
        correct,
        inCorrect,
        totalQuestion,
      };
      return send;
    };
    const analytics1 = await statiStics(section1, 1);
    const analytics2 = await statiStics(section2, 2);
    const analytics3 = await statiStics(section3, 3);
    const analytics4 = await statiStics(section4, 4);
    const analytics = {
      section1: analytics1,
      section2: analytics2,
      section3: analytics3,
      section4: analytics4,
    };

    const data = await MockTest.findByIdAndUpdate(
      mockId,
      {
        isSubmitted: true,
        result: analytics,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Test Successfully Submitted",
      // analytics,
    });
    // res.status(200).send({ success: true, message: "Test End", data });
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
