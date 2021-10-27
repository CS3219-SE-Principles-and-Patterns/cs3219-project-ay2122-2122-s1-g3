const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../model/user-model");
const { handleResponse } = require("../utils/utils");

// To be remove
router.get("/", (req, res) => {
  res.send("Welcome to CS3219 Group Work - Users");
});

router.put("/updatePassword/:id", async function (req, res) {
  if (!req.body.hasOwnProperty("password")) {
    return handleResponse(req, res, 400, null, "New password required.");
  }
  const hash = await bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      return hash;
    })
    .catch((err) => console.error(err));
  req.body.password = hash;

  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return handleResponse(req, res, 400, null, err);
    if (!post) return handleResponse(req, res, 400, null, err);
    User.findById(req.params.id, function (err, post) {
      if (err) return handleResponse(req, res, 400, null, err);
      res.json(post);
    });
  });
});

router.get("/getSingleUser/:id", function (req, res) {
  User.findById(req.params.id, function (err, post) {
    if (err) return handleResponse(req, res, 400, null, err);

    res.json(post);
  });
});

module.exports = router;
