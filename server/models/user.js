const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { hash } = require("bcrypt");

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  image: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
