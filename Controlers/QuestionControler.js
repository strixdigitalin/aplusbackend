const bcrypt = require("bcrypt");
const { validateUserDetail } = require("../Middlewares/AuthMiddleware");
const SendError = require("../Middlewares/Response");
const User = require("../Schema/User");
const validator = require("../Middlewares/Validator");
const Test = require("../Schema/Test");
const Categories = require("../Schema/Categories");
const Question = require("../Schema/Question");
const uploadOnCloudinary = require("../Middlewares/Cloudinary");

const createQuestion = async (req, res, next) => {
  const testData = req.body;

  const { english, hindi } = testData;
  console.log(testData, "<<<testid");

  try {
    if (!validator.isValid(english.question)) {
      return res
        .status(400)
        .send({ status: false, message: "Question is required" });
    }

    // if (!validator.isValid(hindi.question)) {
    //   return res
    //     .status(400)
    //     .send({ status: false, message: "Question Hindi is required" });
    // }
    if (!validator.isValid(english.options)) {
      return res
        .status(400)
        .send({ status: false, message: "Options are required" });
    }
    if (english.options.length < 3) {
      return res
        .status(400)
        .send({ success: false, message: "At least 3 options required" });
    }
    const savedData = await Question.create({
      ...testData,
    });
    res.status(200).send({
      success: true,
      message: "Question Created",
      data: savedData._doc,
    });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const uploadExcel = async (req, res, next) => {
  const { Questions } = req.body;
  console.log(Questions, "<<<< Questions");

  try {
    const data = await Question.insertMany(Questions);

    res.status(200).send({
      success: true,
      message: "Category Created",
      data: data,
    });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const getQuestions = async (req, res, next) => {
  try {
    const data = await Question.find(req.query)
      .populate("testId")
      .sort({ Sr: 1 });
    if (data.length == 0) {
      return res
        .status(400)
        .send({ success: false, message: "Data not found", data: [] });
    }
    res.status(200).send({
      success: true,
      message: "Question fetched",
      data,
    });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const updateQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { questionData } = req.body;
    // let senddata = questionData;
    console.log(questionData);
    let payload = {
      correctAnswer: questionData.correctAnswer,
      level: questionData.level,
      topic: questionData.topic,
      solution: questionData.solution,

      section: questionData.section,
    };

    // res.status(200).send({ success: true, senddata });
    // return null;

    if (!questionId)
      return res
        .status(400)
        .send({ success: false, message: "Question Id is required" });
    if (!questionData)
      return res
        .status(400)
        .send({ success: false, message: "Question Data is required" });

    const data = await Question.findByIdAndUpdate(questionId, payload, {
      new: true,
    });
    res.status(200).send({
      success: true,
      message: "Question updated",
      data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const updateQuestionMedia = async (req, res) => {
  try {
    let { question, lang, questionId, fieldText } = req.body;
    const { image } = req.files;
    console.log(req.body);

    if (question == 1) {
      if (lang == "eng") {
        let values = {};
        if (fieldText) {
          values = { ...values, "english.question": fieldText };
        }
        if (image) {
          const imageUrl = await uploadOnCloudinary(req.files.image[0]);

          values = { ...values, "english.isImage": imageUrl };
        }
        const data = await Question.findByIdAndUpdate(
          questionId,
          {
            $set: values,
          },
          { new: true }
        );
        return res
          .status(200)
          .send({ success: true, message: "File updated", data });
      }
      if (lang == "hindi") {
        let values = {};
        if (fieldText) {
          values = { ...values, "hindi.question": fieldText };
        }
        if (image) {
          const imageUrl = await uploadOnCloudinary(req.files.image[0]);

          values = { ...values, "hindi.isImage": imageUrl };
        }
        const data = await Question.findByIdAndUpdate(
          questionId,
          {
            $set: values,
          },
          { new: true }
        );
        return res
          .status(200)
          .send({ success: true, message: "File updated", data });
      }
    }
    const questionData = await Question.findById(questionId);

    // console.log(questionData, "<<this is question data");

    const { option } = req.body;
    if (lang == "eng") {
      let options = questionData.english.options;

      let imageURL = image?.length
        ? await uploadOnCloudinary(req.files.image[0])
        : options[option - 1].isImage;
      options[option - 1].option = fieldText;
      options[option - 1].isImage = imageURL;
      console.log(options, "<<< this is new options");
      const data = await Question.updateOne(
        { _id: questionId },
        {
          $set: {
            "english.options": options,
          },
        },
        { new: true }
      );
      res.status(200).send({ success: true, message: "File updated", data });
    }
    if (lang == "hindi") {
      let options = questionData.hindi.options;
      let imageURL = image?.length
        ? await uploadOnCloudinary(req.files.image[0])
        : options[option - 1].isImage;
      options[option - 1].option = fieldText;
      options[option - 1].isImage = imageURL;
      console.log(options, "<<< this is new options");
      const data = await Question.updateOne(
        { _id: questionId },
        {
          $set: {
            "hindi.options": options,
          },
        },
        { new: true }
      );
      res.status(200).send({ success: true, message: "File updated", data });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, message: error.message });
  }
};
// const userLogin = async function (req, res) {
//   try {
//     const loginDetails = req.body;

//     const { email, password } = loginDetails;

//     if (!validator.isValidRequestBody(loginDetails)) {
//       return res
//         .status(400)
//         .send({ status: false, message: "Please provide login details" });
//     }

//     if (!validator.isValid(email)) {
//       return res
//         .status(400)
//         .send({ status: false, message: "Email-Id is required" });
//     }

//     if (!validator.isValid(password)) {
//       return res
//         .status(400)
//         .send({ status: false, message: "Password is required" });
//     }

//     const userData = await User.findOne({ email });

//     if (!userData) {
//       return res.status(401).send({
//         status: false,
//         message: `Login failed!! Email-Id is incorrect!`,
//       });
//     }

//     const checkPassword = await bcrypt.compare(password, userData.password);

//     if (!checkPassword)
//       return res.status(401).send({
//         status: false,
//         message: `Login failed!! password is incorrect.`,
//       });

//     delete userData["password"];
//     return res.status(200).send({
//       status: true,
//       message: "LogIn Successful!!",
//       data: userData,
//     });
//   } catch (err) {
//     return res.status(500).send({ status: false, error: err.message });
//   }
// };
module.exports = {
  getQuestions,
  uploadExcel,
  updateQuestion,
  createQuestion,
  updateQuestionMedia,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
