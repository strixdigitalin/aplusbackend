const express = require("express");
const {
  getAsset,
  createAsset,
  createLogo,
  createPdf,
  uploadImages,
  getAllQuestionImages,
  getPDF,
  createBanner,
  getBanner,
  deleteBanner,
  deletePdf,
} = require("../Controlers/AssetControler");
const {
  CreateUser,
  userLogin,
} = require("../Controlers/AuthenticationControler");
const {
  createCategory,
  getCategory,
} = require("../Controlers/CategoryControler");
const { getCourse, createCourse } = require("../Controlers/CourseControler");
const { createTest, getTest } = require("../Controlers/TestControler");
const router = express.Router();
const upload = require("../Middlewares/Multer");

// router.post(
//   "/banner",
//   upload.fields([{ name: "image", maxCount: 5 }]),
//   createAsset
// );
router.post(
  "/logo",
  upload.fields([{ name: "image", maxCount: 5 }]),
  createLogo
);
router.post("/pdf", upload.fields([{ name: "pdf", maxCount: 2 }]), createPdf);
router.post(
  "/banner",
  upload.fields([{ name: "image", maxCount: 2 }]),
  createBanner
);
router.get("/get/pdf", getPDF);
router.get("/get/banner", getBanner);
router.get("/get", getAsset);
router.get("/question", getAllQuestionImages);
router.post(
  "/upload-images",
  upload.fields([{ name: "image", maxCount: 10 }]),
  uploadImages
);

router.delete("/banner/:id", deleteBanner);
router.delete("/pdf/:id", deletePdf);

// router.post("/login", upload.none(), userLogin);
// router.post("/user", upload.none(), userLogin);
// router.post("/signup", upload.none(), createUser2);
// router.post("/login", upload.none(), userLogin);
// router.get("/user", verifyToken, getUserDetails);

// router.put(
//   "/user/:userId",
//   upload.fields([{ name: "avatar", maxCount: 1 }]),
//   verifyToken,
//   updateUserDetails
// );
// router.delete("/user/:userId", upload.none(), deleteUser);
// router.post("/sendotp", upload.none(), SendOtp);
// router.post("/initiate-passchange", upload.none(), forgetPassSendOtp);
// router.post("/verifyotp", upload.none(), verify);
// router.post("/change-pass", upload.none(), ChangePassword);
// // router.post("/forget-pass", upload.none(), forgotPassword);
// router.post("/verify-forget-pass", upload.none(), forgetPass);

// app.get("/user/:userId", userAuthentication, getUserDetails);

module.exports = router;
