const express = require("express");
const router = express.Router();
const User = require("../model/user-model");

// request handlers
router.get("/", (req, res) => {
  res.send("Welcome to the Node.js Tutorial! - ");
});



module.exports = router;
