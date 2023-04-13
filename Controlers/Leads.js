const bcrypt = require("bcrypt");
const SendError = require("../Middlewares/Response");
const User = require("../Schema/User");
const validator = require("../Middlewares/Validator");
const Test = require("../Schema/Test");
const Categories = require("../Schema/Categories");
const CourseSchema = require("../Schema/CourseSchema");
const LEAds = require("../Schema/Contactus");

const CreateLEad = async (req, res, next) => {
  try {
    const testData = req.body;
    const savedData = await LEAds.create({
      ...testData,
    });
    res.status(200).send({
      success: true,
      message: "Form submitted",
      data: savedData._doc,
    });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const GetLEads = async (req, res, next) => {
  try {
    const data = await LEAds.find(req.query);
    if (data.length == 0) {
      return res
        .status(400)
        .send({ success: false, message: "Data not found", data });
    }
    res.status(200).send({
      success: true,
      message: "Leads fetched",
      data,
    });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

module.exports = {
  CreateLEad,
  GetLEads,
};
