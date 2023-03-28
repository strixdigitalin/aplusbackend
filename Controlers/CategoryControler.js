const bcrypt = require("bcrypt");
const { validateUserDetail } = require("../Middlewares/AuthMiddleware");
const SendError = require("../Middlewares/Response");
const User = require("../Schema/User");
const validator = require("../Middlewares/Validator");
const Test = require("../Schema/Test");
const Categories = require("../Schema/Categories");

const createCategory = async (req, res, next) => {
  const testData = req.body;
  if (!req.files) {
    return res
      .status(400)
      .send({ success: false, message: "image is required" });
  }
  const { image } = req.files;
  console.log(image, "<<< this is image");
  const uploadedFile = image[0];
  if (!image) {
    return res
      .status(400)
      .send({ success: false, message: "Image is required" });
  }
  const { categoryName } = testData;
  try {
    if (!validator.isValid(categoryName)) {
      return res
        .status(400)
        .send({ status: false, message: "categoryName is required" });
    }
    const savedData = await Categories.create({
      ...testData,
      image: uploadedFile.filename,
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

const getCategory = async (req, res, next) => {
  try {
    const data = await Categories.find(req.query).populate("course");
    if (data.length == 0) {
      return res
        .status(400)
        .send({ success: false, message: "Data not found", data });
    }
    res.status(200).send({
      success: true,
      message: "Categories fetched",
      data,
    });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  const test = await Test.find({ category: id });
  if (!test.length) {
    const data = await Categories.findOneAndDelete({ _id: id });
    res.status(200).send({ success: true, message: " Category Deleted", data });
  } else {
    res
      .status(400)
      .send({ success: false, message: "Category can't be deleted" });
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
  getCategory,
  deleteCategory,
  createCategory,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
