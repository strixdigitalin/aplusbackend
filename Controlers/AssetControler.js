const SendError = require("../Middlewares/Response");

const Assets = require("../Schema/Assets");
const GLOBAL = require("../GLOBAL_CONSTANTS");
const ImageSchema = require("../Schema/ImageSchema");
const { Asset_ID } = GLOBAL;
const createAsset = async (req, res, next) => {
  const testData = req.body;
  if (!req.files) {
    return res
      .status(400)
      .send({ success: false, message: "File is required" });
  }

  console.log(req.files, "<<< these are files");
  let tempData = req.files.image.map((item) => {
    return item.filename;
  });
  try {
    const data = await Assets.findByIdAndUpdate(
      Asset_ID,
      {
        banner: tempData,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Assets Created",
      data,
    });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const createLogo = async (req, res, next) => {
  const testData = req.body;
  if (!req.files) {
    return res
      .status(400)
      .send({ success: false, message: "File is required" });
  }

  try {
    console.log(req.files);
    const data = await Assets.findByIdAndUpdate(
      Asset_ID,
      {
        logo: req.files.image[0].filename,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Assets Created",
      data,
    });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const createPdf = async (req, res, next) => {
  const testData = req.body;
  if (!req.files) {
    return res
      .status(400)
      .send({ success: false, message: "File is required" });
  }

  try {
    console.log(req.files);
    const data = await Assets.findByIdAndUpdate(
      Asset_ID,
      {
        pdf: req.files.pdf[0].filename,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Assets Created",
      data,
    });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const getAsset = async (req, res, next) => {
  try {
    const data = await Assets.find({ _id: Asset_ID });
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

const uploadImages = async (req, res, next) => {
  try {
    console.log(req.files);
    if (!req.files) {
      return res
        .status(400)
        .send({ success: false, message: "File is required" });
    }
    const { image } = req.files;
    if (!image.length) {
      return res
        .status(400)
        .send({ success: false, message: "Image is required" });
    }
    console.log(image, "<<< all  images");

    const payload = image.map((item) => {
      return { type: "Question", filename: item.filename };
    });

    const data = await ImageSchema.insertMany(payload);
    res.status(200).send({ success: true, data: data });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};
const getAllQuestionImages = async (req, res) => {
  try {
    const images = await ImageSchema.find({}).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Images fetched",
      images,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
module.exports = {
  createAsset,
  createPdf,
  createLogo,
  getAsset,
  uploadImages,
  getAllQuestionImages,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
