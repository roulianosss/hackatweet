const express = require("express");
const router = express.Router();
const Hashtag = require("../models/hashtags");

// fetch tout les hashtags
router.get("/allHashtags", async (req, res) => {
  const allHashtag = await Hashtag.find();
  res.json(allHashtag);
});

// fetch la suppression de tout les hashtags
router.delete("/allHashtags", async (req, res) => {
  const deletedHashtags = await Hashtag.deleteMany({});
  res.json(deletedHashtags);
});

module.exports = router;
