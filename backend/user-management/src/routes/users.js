const express = require("express");
const router = express.Router();
const User = require("../model/user-model");

// request handlers
router.get("/", (req, res) => {
  res.send("Welcome to CS3219 Group Work - Users");
});

module.exports = router;
