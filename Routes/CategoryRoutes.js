const express = require("express");
const {
  CreateUser,
  userLogin,
} = require("../Controlers/AuthenticationControler");
const {
  createCategory,
  getCategory,
  deleteCategory,
} = require("../Controlers/CategoryControler");
const { createTest, getTest } = require("../Controlers/TestControler");
const router = express.Router();
const upload = require("../Middlewares/Multer");

router.post(
  "/create",
  upload.fields([{ name: "image", maxCount: 1 }]),
  createCategory
);
router.get("/get", getCategory);
router.delete("/delete/:id", deleteCategory);
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
