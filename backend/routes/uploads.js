const express = require("express");
const multer = require("multer");
const User = require("../models/users");

const router = express.Router();

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

// update avatar
router.post(
  "/avatar/:userId",
  upload.single("image"),
  async (req, res, next) => {
    const image = {
      data: new Buffer.from(req.file.buffer, "base64"),
      contentType: req.file.mimetype,
    };
    const data = await User.findByIdAndUpdate(
      req.params.userId,
      { avatar: image },
      { new: true }
    );
    res.json(data);
  }
);

module.exports = router;
