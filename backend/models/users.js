const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    token: String,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
