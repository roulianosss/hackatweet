const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("./models/connection");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const tweetsRouter = require("./routes/tweets");
const hashtagsRouter = require("./routes/hashtags");
const uploadsRouter = require("./routes/uploads");

const app = express();

const cors = require("cors");
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tweets", tweetsRouter);
app.use("/hashtags", hashtagsRouter);
app.use("/uploads", uploadsRouter);

module.exports = app;
