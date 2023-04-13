const express = require("express");
const {
  CreateUser,
  userLogin,
} = require("../Controlers/AuthenticationControler");
const {
  createSubscription,
  getSubscription,
  updateSubsCription,
  deletePlan,
  subscribe,
} = require("../Controlers/SubscriptionControler");

const router = express.Router();
const upload = require("../Middlewares/Multer");

router.post("/create", createSubscription);
router.get("/get", getSubscription);
router.post("/subscribe/:id", subscribe);
router.put(
  "/update/:id",

  updateSubsCription
);
router.delete("/delete/:id", deletePlan);

module.exports = router;
