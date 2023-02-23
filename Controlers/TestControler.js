const bcrypt = require("bcrypt");
const { validateUserDetail } = require("../Middlewares/AuthMiddleware");
const SendError = require("../Middlewares/Response");
const User = require("../Schema/User");
const validator = require("../Middlewares/Validator");
const Test = require("../Schema/Test");

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
  //   const testData = req.body;
  //   const { category, title, description, amount, isPaid } = testData;
  try {
    const test = await Test.find(req.query);

    res
      .status(200)
      .send({ success: true, message: "Test Created", data: test });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.find(req.query);
    if (user.length == 0) {
      return res
        .status(400)
        .send({ success: false, message: "User fetched", user });
    }
    res.status(200).send({
      success: true,
      message: "User successfully created",
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
  getTest,
  createTest,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
