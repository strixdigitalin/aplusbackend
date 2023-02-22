const bcrypt = require("bcrypt");
const { validateUserDetail } = require("../Middlewares/AuthMiddleware");
const SendError = require("../Middlewares/Response");
const User = require("../Schema/User");

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
module.exports = {
  CreateUser,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
