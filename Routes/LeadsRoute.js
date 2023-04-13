const express = require("express");
const {
  CreateUser,
  userLogin,
} = require("../Controlers/AuthenticationControler");
const {
  createCategory,
  getCategory,
} = require("../Controlers/CategoryControler");
const router = express.Router();
const upload = require("../Middlewares/Multer");
const { CreateLEad, GetLEads } = require("../Controlers/Leads");

router.post("/create", upload.none(), CreateLEad);
router.get("/get", GetLEads);

module.exports = router;
