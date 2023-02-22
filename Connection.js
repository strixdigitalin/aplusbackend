const mongoose = require("mongoose");
const GLOBAL = require("./GLOBAL_CONSTANTS");

mongoose
  .connect(GLOBAL.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(async (db) => {
    console.log("connected to database");
    // const cre = await db.models.user.createIndexes({ location_1: "2dsphere" });
    // console.log(cre, ">>>cre");
  })
  .catch((err) => {
    console.log(err);
  });
