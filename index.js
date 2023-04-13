const express = require("express");
const app = express();
var multer = require("multer");
var forms = multer();
var DB = require("./Connection.js");
app.use(express.json());
// const mongoose = require("mongoose");
// --------------------------------------------------- IMPORT ROUTES
const authRoutes = require("./Routes/AuthenticationRoutes");
const userRoutes = require("./Routes/UserRoutes");
const TestRoutes = require("./Routes/TestRoutes");
const CategoryRoutes = require("./Routes/CategoryRoutes");
const QuestionRoutes = require("./Routes/QuestionRoutes");
const CourseRoutes = require("./Routes/CourseRoutes");
const AssetsRoutes = require("./Routes/AssetsRoutes");
const BlogRoutes = require("./Routes/BlogRoutes");
const FaqRoutes = require("./Routes/FaqRoutes");
const SubCAtegory = require("./Routes/SubCategoriesRoutes");
const MockRoutes = require("./Routes/MockTestRoutes");
const SubscriptionRoutes = require("./Routes/SubscriptionRoutes");
const MentorRoutes = require("./Routes/MentorProgramRoutes");
const LeadRoutes = require("./Routes/LeadsRoute.js");
// ----------------------------------------------------------------------------------------------

// -------------------------------------------------------- API VALIDATIONS-----------------------
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));

var cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
app.use(function (req, res, next) {
  console.log(req._parsedUrl.path, "----<<<<<<<<<<<Current ");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// ---------------------------------------------------------------------

//-------------------------------------------------------------------------  define Routes
app.use("/static", express.static("uploads"));
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/test", TestRoutes);
app.use("/category", CategoryRoutes);
app.use("/question", QuestionRoutes);
app.use("/course", CourseRoutes);
app.use("/asset", AssetsRoutes);
app.use("/blog", BlogRoutes);
app.use("/faq", FaqRoutes);
app.use("/sub-category", SubCAtegory);
app.use("/mock", MockRoutes);
app.use("/subscription", SubscriptionRoutes);
app.use("/mentor", MentorRoutes);
app.use("/lead", LeadRoutes);
// ------------------------------------------------------

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
