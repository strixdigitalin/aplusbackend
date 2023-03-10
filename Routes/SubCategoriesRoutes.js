const express = require("express");
const {
  CreateUser,
  userLogin,
} = require("../Controlers/AuthenticationControler");
const {
  createCategory,
  getCategory,
} = require("../Controlers/CategoryControler");
const {
  createSubCategory,
  getSubCategory,
} = require("../Controlers/SubCategoryControler");
const { createTest, getTest } = require("../Controlers/TestControler");
const router = express.Router();
const upload = require("../Middlewares/Multer");

router.post(
  "/create",
  upload.fields([{ name: "image", maxCount: 1 }]),
  createSubCategory
);

router.get("/get", getSubCategory);

module.exports = router;
