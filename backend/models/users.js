const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  firstname: String,
  username: String,
  password: String,
  token: String,
  isConnected: Boolean,
  connectionTime: Date,
  disconnectionTime: Date,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
