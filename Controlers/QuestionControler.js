const bcrypt = require("bcrypt");
const { validateUserDetail } = require("../Middlewares/AuthMiddleware");
const SendError = require("../Middlewares/Response");
const User = require("../Schema/User");
const validator = require("../Middlewares/Validator");
const Test = require("../Schema/Test");
const Categories = require("../Schema/Categories");
const Question = require("../Schema/Question");

const createQuestion = async (req, res, next) => {
  const testData = req.body;

  const { question, options } = testData;

  try {
    if (!validator.isValid(question)) {
      return res
        .status(400)
        .send({ status: false, message: "Question is required" });
    }
    if (!validator.isValid(options)) {
      return res
        .status(400)
        .send({ status: false, message: "Options are required" });
    }
    if (options.length < 3) {
      return res
        .status(400)
        .send({ success: false, message: "At least 3 options required" });
    }
    const savedData = await Question.create({
      ...testData,
    });
    res.status(200).send({
      success: true,
      message: "Category Created",
      data: savedData._doc,
    });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const getQuestions = async (req, res, next) => {
  try {
    const user = await Question.find(req.query);
    if (user.length == 0) {
      return res
        .status(400)
        .send({ success: false, message: "Data not found", user });
    }
    res.status(200).send({
      success: true,
      message: "Question fetched",
      user,
    });
  } catch (e) {
    console.log(e);
    SendError(res, e);
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
  createQuestion,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
