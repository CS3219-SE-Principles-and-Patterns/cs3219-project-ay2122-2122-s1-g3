const express = require("express");
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
  const userData = await User.findOne()
    .where("username")
    .equals(bodyData.username);

  if (userData) {
    return handleResponse(request, response, 400, null, "Username exists");
  }

  bodyData["isAdmin"] = false;

  User.create(request.body, function (err, post) {
    if (err) {
      return next(err);
    }
    response.json(post);
  });
});

router.post("/signin", async function (request, response) {
  // Return 400 status if either field is empty
  if (
    !request.body.hasOwnProperty("username") ||
    !request.body.hasOwnProperty("password")
  ) {
    return handleResponse(
      request,
      response,
      400,
      null,
      "Username and Password required."
    );
  }

  const username = request.body.username;
  const password = request.body.password;

  const userData = await User.findOne()
    .where("username")
    .equals(username)
    .where("password")
    .equals(password);

  // Return 401 status if credential is not matched
  if (userData != null) {
    if (username !== userData.username || password != userData.password) {
      // Change userData to get from MongoDB
      return handleResponse(
        request,
        response,
        401,
        null,
        "Username or Password is invalid."
      );
    }
  } else {
    return handleResponse(
      request,
      response,
      401,
      null,
      "Username or Password is invalid."
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
