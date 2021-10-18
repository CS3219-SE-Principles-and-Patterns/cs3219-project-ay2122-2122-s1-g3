// Generate token using secret from process.env.JWT_Secret
const jwt = require("jsonwebtoken");
const moment = require("moment");
const ms = require("ms");

// Generate token
function generateToken(user) {
  // Password and other sensitive fields should not be added in the token
  // Add information useful to other parts
  if (!user) {
    return null;
  }

  // User data that will be use in the token generation
  const userData = getCleanUser(user);

  const token = jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24, // Expires in 24 hours
  });

  // expiry time of the access token
  const expiredAt = moment()
    .add(ms(process.env.ACCESS_TOKEN_LIFE), "ms")
    .valueOf();

  return { token, expiredAt };
}

// Data that will be used in the token generation
function getCleanUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
  };
}

// Handle API response
function handleResponse(request, response, statusCode, data, message) {
  let isError = false;
  let errorMessage = message;
  switch (statusCode) {
    case 204:
      return response.sendStatus(204);
    case 400:
      isError = true;
      break;
    case 401:
      isError = true;
      errorMessage = message || "Invalid user.";
      break;
    case 403:
      isError = true;
      errorMessage = message || "Access to this resource is denied.";
      break;
    default:
      break;
  }
  const resObj = data || {};
  if (isError) {
    resObj.error = true;
    resObj.message = errorMessage;
  }
  return response.status(statusCode).json(resObj);
}

// Export for others to use this function
module.exports = {
  generateToken,
  getCleanUser,
  handleResponse,
};
