const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGODB_URL;
const connect_db = async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/togglebytes`);
    console.log("connected to database");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connect_db;
