const express = require("express");
const {
  CreateUser,
  userLogin,
} = require("../Controlers/AuthenticationControler");
const {
  createQuestion,
  getQuestions,
} = require("../Controlers/QuestionControler");
const router = express.Router();
const upload = require("../Middlewares/Multer");

router.post("/create", createQuestion);
router.get("/get", getQuestions);

module.exports = router;
