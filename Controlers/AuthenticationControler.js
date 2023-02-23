const bcrypt = require("bcrypt");
const { validateUserDetail } = require("../Middlewares/AuthMiddleware");
const SendError = require("../Middlewares/Response");
const User = require("../Schema/User");
const validator = require("../Middlewares/Validator");

const CreateUser = async (req, res, next) => {
  try {
    const userDetails = req.body;
    const isValid = await validateUserDetail(req, res, next);
    if (!isValid) {
      return null;
    }
    // const { firstName, lastName } = userDetails;

    const hashedPassword = await bcrypt.hash(userDetails.password, 10);
    userDetails.password = hashedPassword;
    const savedData = await User.create(userDetails);
    res.status(200).send({
      success: true,
      message: "User successfully created",
      user: savedData._doc,
    });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const userLogin = async function (req, res) {
  try {
    const loginDetails = req.body;

    const { email, password } = loginDetails;

    if (!validator.isValidRequestBody(loginDetails)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide login details" });
    }

    if (!validator.isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Email-Id is required" });
    }

    if (!validator.isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: "Password is required" });
    }

    const userData = await User.findOne({ email });

    if (!userData) {
      return res.status(401).send({
        status: false,
        message: `Login failed!! Email-Id is incorrect!`,
      });
    }

    const checkPassword = await bcrypt.compare(password, userData.password);

    if (!checkPassword)
      return res.status(401).send({
        status: false,
        message: `Login failed!! password is incorrect.`,
      });

    delete userData["password"];
    return res.status(200).send({
      status: true,
      message: "LogIn Successful!!",
      data: userData,
    });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};
module.exports = {
  CreateUser,
  userLogin,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
