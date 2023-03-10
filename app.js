const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const hbs = require("hbs");
const cors = require("cors");
const connect_db = require("./src/db/db");
const homeRouter = require("./src/controler/rouutes/userform");
require("dotenv").config();
mongoose.set("strictQuery", true);
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use(cors());
app.set("view engine", "hbs");
app.set("view engine", "html");
app.engine("html", require("hbs").__express);

hbs.registerHelper("isfirst", function (value) {
  return value !== 0;
});

hbs.registerHelper("isMarraied", function (value) {
  return value == "Married";
});

hbs.registerHelper("isUnmarraied", function (value) {
  return value == "Unmarried";
});

hbs.registerPartials(path.join(__dirname, "./views/partials"), function (err) {
  if (err) console.log("partial error", err);
});
console.log(path.join(__dirname, "./uploads"));
app.use(homeRouter);

app.listen(port, async () => {
  try {
    await connect_db();
    console.log("server listening on http://localhost:8080/index");
  } catch (error) {
    console.log("server listening failed deu to", error.message);
  }
});
