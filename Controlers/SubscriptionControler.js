const bcrypt = require("bcrypt");
const { validateUserDetail } = require("../Middlewares/AuthMiddleware");
const SendError = require("../Middlewares/Response");
const User = require("../Schema/User");
const validator = require("../Middlewares/Validator");
const Test = require("../Schema/Test");
const Question = require("../Schema/Question");
const SubscriptionPlans = require("../Schema/SubscriptionPlans");

const createSubscription = async (req, res, next) => {
  const testData = req.body;

  try {
    const savedData = await SubscriptionPlans.create(testData);
    res
      .status(200)
      .send({ success: true, message: "Test Created", data: savedData._doc });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const getSubscription = async (req, res, next) => {
  try {
    const test = await SubscriptionPlans.find(req.query);

    if (test.length == 0) {
      return res.status(400).send({ success: false, message: "No Data Found" });
    }
    res
      .status(200)
      .send({ success: true, message: "Test Data fetched", data: test });
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await SubscriptionPlans.findOneAndDelete({ _id: id });
    res.status(200).send({ success: true, message: "Deleted", data });
  } catch (error) {}
};
const updateSubsCription = async (req, res, next) => {
  const { id } = req.params;
  // const test = await Test.find({ subCategory: id });
  if (true) {
    const data = await SubscriptionPlans.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.status(200).send({ success: true, message: "Sub Category", data });
  } else {
  }
};

const subscribe = async (req, res) => {
  try {
    const { id } = req.params;
    const { duration, subscription } = req.body;
    if (!id)
      return res
        .status(400)
        .send({ success: false, message: " userid is required" });
    if (!duration)
      return res
        .status(400)
        .send({ success: false, message: " duration is required" });
    if (!subscription)
      return res
        .status(400)
        .send({ success: false, message: " subscription is required" });

    let startDate = new Date();
    let endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 3);
    let subscriptionDuration = {
      startDate,
      endDate,
      duration: req.body.duration,
    };

    const data = await User.findByIdAndUpdate(
      req.params.id,
      { subscriptionDuration, subscription },
      {
        new: true,
      }
    );

    res.status(200).send({ success: true, message: "User updated", data });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
module.exports = {
  getSubscription,
  createSubscription,
  updateSubsCription,
  deletePlan,
  subscribe,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
