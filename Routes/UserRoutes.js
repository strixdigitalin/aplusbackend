const express = require("express");
const {
  CreateUser,
  userLogin,
} = require("../Controlers/AuthenticationControler");
const { getUser, updateUser } = require("../Controlers/UserControler");
const router = express.Router();
const upload = require("../Middlewares/Multer");

router.get("/get", getUser);
router.put("/update/:id", updateUser);

module.exports = router;
