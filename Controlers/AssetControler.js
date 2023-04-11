const SendError = require("../Middlewares/Response");

const Assets = require("../Schema/Assets");
const GLOBAL = require("../GLOBAL_CONSTANTS");
const ImageSchema = require("../Schema/ImageSchema");
const PdfsSchema = require("../Schema/PdfsSchema");
const BannerSchema = require("../Schema/BannerSchema");
const uploadOnCloudinary = require("../Middlewares/Cloudinary");
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
  const { assetId } = req.query;
  console.log(tempData, assetId, "<<< this is temp data");
  try {
    if (assetId) {
      const data = await Assets.findByIdAndUpdate(
        assetId,
        {
          banner: tempData,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Assets updated",
        data,
      });
    } else {
      const data = await Assets.create({
        banner: tempData,
      });
      res.status(200).send({
        success: true,
        message: "Assets Created",
        data,
      });
    }
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
      req.query.assetId,
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
  if (!req.files) {
    return res
      .status(400)
      .send({ success: false, message: "File is required" });
  }
  let tempData = req.files.pdf.map((item) => {
    return item.filename;
  });
  const imageurl = await uploadOnCloudinary(req.files.pdf[0]);

  const data = await PdfsSchema.create({
    link: tempData[0],
    // link: imageurl,
    title: req.body?.title ? req.body.title : "",
  });
  res.status(200).send({
    success: true,
    data,
  });
  // const testData = req.body;
  // if (!req.files) {
  //   return res
  //     .status(400)
  //     .send({ success: false, message: "File is required" });
  // }

  // try {
  //   console.log(req.files);
  //   let tempData = req.files.pdf.map((item) => {
  //     return item.filename;
  //   });

  //   const data = await Assets.findByIdAndUpdate(
  //     req.query.assetId,
  //     { pdf: tempData },
  //     { new: true }
  //   );
  //   res.status(200).send({
  //     success: true,
  //     message: "Assets Created",
  //     data,
  //   });
  // } catch (e) {
  //   console.log(e);
  //   SendError(res, e);
  // }
};
const createBanner = async (req, res, next) => {
  if (!req.files) {
    return res
      .status(400)
      .send({ success: false, message: "File is required" });
  }
  let tempData = req.files.image.map((item) => {
    return item.filename;
  });
  const imageurl = await uploadOnCloudinary(req.files.image[0]);
  const data = await BannerSchema.create({
    link: imageurl,
    title: req.body?.title ? req.body.title : "",
  });
  res.status(200).send({
    success: true,
    data,
  });
};
const deleteBanner = async (req, res) => {
  const { id } = req.params;
  const data = await BannerSchema.findOneAndDelete({ _id: id });
  res.status(200).send({ success: true, message: "Banner Deleted", data });
};
const deletePdf = async (req, res) => {
  const { id } = req.params;
  const data = await PdfsSchema.findOneAndDelete({ _id: id });
  res.status(200).send({ success: true, message: "PDF Deleted", data });
};

// ----------------------

const getPDF = async (req, res) => {
  res.status(200).send({
    success: true,
    data: await PdfsSchema.find(req.query),
  });
};
const getBanner = async (req, res) => {
  res.status(200).send({
    success: true,
    data: await BannerSchema.find(req.query),
  });
};

// -----------

const getAsset = async (req, res, next) => {
  try {
    const data = await Assets.find(req.query);
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

// ----------

module.exports = {
  createAsset,
  createPdf,
  createLogo,
  getAsset,
  uploadImages,
  getAllQuestionImages,
  getPDF,
  createBanner,
  deletePdf,
  deleteBanner,
  getBanner,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
