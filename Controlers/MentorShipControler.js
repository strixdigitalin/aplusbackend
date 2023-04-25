const uploadOnCloudinary = require("../Middlewares/Cloudinary");
const SendError = require("../Middlewares/Response");
const MentorSchema = require("../Schema/MentorSchema");

const createProgram = async (req, res, next) => {
  const testData = req.body;
  try {
    console.log(req.files);
    const imageUrl = req.files.image[0].filename;
    const savedData = await MentorSchema.create({
      ...testData,
      image: imageUrl,
    });
    res
      .status(200)
      .send({ success: true, message: "Test Created", data: savedData._doc });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const getProgram = async (req, res, next) => {
  try {
    const test = await MentorSchema.find(req.query);

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

const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await MentorSchema.findOneAndDelete({ _id: id });
    res.status(200).send({ success: true, message: "Deleted", data });
  } catch (error) {}
};
const updateProgram = async (req, res, next) => {
  const { id } = req.params;
  // const test = await Test.find({ subCategory: id });
  if (true) {
    const data = await MentorSchema.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).send({ success: true, message: "Sub Category", data });
  } else {
  }
};

module.exports = {
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
