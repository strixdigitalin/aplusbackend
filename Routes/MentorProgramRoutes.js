const express = require("express");
const {
  CreateUser,
  userLogin,
} = require("../Controlers/AuthenticationControler");
const {
  createProgram,
  getProgram,
  updateProgram,
  deleteProgram,
} = require("../Controlers/MentorShipControler");
const {
  createSubscription,
  getSubscription,
  updateSubsCription,
  deletePlan,
} = require("../Controlers/SubscriptionControler");

const router = express.Router();
const upload = require("../Middlewares/Multer");

router.post(
  "/create",
  upload.fields([{ name: "image", maxCount: 1 }]),
  createProgram
);
router.get("/get", getProgram);
router.put(
  "/update/:id",

  updateProgram
);
router.delete("/delete/:id", deleteProgram);

module.exports = router;
