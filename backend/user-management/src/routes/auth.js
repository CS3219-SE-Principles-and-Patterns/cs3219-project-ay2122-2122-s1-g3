const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../model/user-model");
const {
  generateToken,
  getCleanUser,
  handleResponse,
  verifyToken,
  getOrSetCache,
} = require("../utils/utils");

router.post("/signup", async function (request, response, next) {
  const bodyData = request.body;

  if (
    !bodyData.hasOwnProperty("username") ||
    !bodyData.hasOwnProperty("password") ||
    !bodyData.hasOwnProperty("email")
  ) {
    return handleResponse(
      request,
      response,
      400,
      null,
      "Username and Password and Email required."
    );
  }

  // Cannot have same username
  const userData = await User.findOne().where("email").equals(bodyData.email);

  if (userData) {
    return handleResponse(request, response, 400, null, "Email exists");
  }

  const hash = await bcrypt
    .hash(bodyData["password"], 10)
    .then((hash) => {
      return hash;
    })
    .catch((err) => console.error(err));

  bodyData["password"] = hash;
  bodyData["isAdmin"] = false;

  User.create(bodyData, function (err, post) {
    if (err) {
      return next(err);
    }
    response.json(post);
  });
});

router.post("/signin", async function (request, response) {
  // Return 400 status if either field is empty
  if (
    !request.body.hasOwnProperty("email") ||
    !request.body.hasOwnProperty("password")
  ) {
    return handleResponse(
      request,
      response,
      400,
      null,
      "Email and Password required."
    );
  }

  const email = request.body.email;
  const password = request.body.password;

  const userData = await User.findOne().where("email").equals(email);
  if (!userData) {
    return handleResponse(
      request,
      response,
      401,
      null,
      "Email or Password is invalid."
    );
  }

  // Return 401 status if credential is not matched
  const isValid = await bcrypt
    .compare(password, userData.password)
    .then((result) => {
      return result;
    })
    .catch((err) => console.error(err));

  if (!isValid) {
    return handleResponse(
      request,
      response,
      401,
      null,
      "Email or Password is invalid."
    );
  }

  // When username and password matches existing records
  const token = generateToken(userData); // Generate Token
  const userObj = await getOrSetCache(`${token.token}`, async () => {
    return getCleanUser(userData);
  });

  return handleResponse(request, response, 200, {
    user: userObj,
    token: token.token,
    expiredAt: token.expiredAt,
  });
});

// Verify token
router.get("/verifyToken", function (request, response) {
  // Check header or URL parameter or POST parameter for token
  const token = request.query.token;
  if (!token) {
    return handleResponse(request, response, 400, null, "Token required.");
  }

  // Check token that was passed by decoding token using secret
  verifyToken(token, async (err, payload) => {
    if (err) {
      return handleResponse(request, response, 401);
    }

    const userData = await User.findOne().where("_id").equals(payload.id);
    // get basic user details
    const userObj = getCleanUser(userData);

    // return the token along with user details
    return handleResponse(request, response, 200, {
      user: userObj,
      token: token,
    });
  });
});

module.exports = router;
