// Generate token using secret from process.env.JWT_Secret
const jwt = require("jsonwebtoken");
const moment = require("moment");
const ms = require("ms");
const redis = require("redis");
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

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
    expiresIn: process.env.ACCESS_TOKEN_LIFE, // Expires in 24 hours
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
    email: user.email,
    isSearching: user.isSearching,
    difficulty: user.difficulty,
    isAdmin: user.isAdmin,
  };
}

// verify access token and refresh token
function verifyToken(token, func) {
  jwt.verify(token, process.env.JWT_SECRET, func);
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

function getOrSetCache(key, callback) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (error, data) => {
      if (error) {
        return reject(error);
      }

      if (data != null) {
        return resolve(JSON.parse(data));
      }

      const freshData = await callback();
      redisClient.setex(
        key,
        process.env.REDIS_EXPIRATION,
        JSON.stringify(freshData)
      );
      resolve(freshData);
    });
  });
}

// Export for others to use this function
module.exports = {
  generateToken,
  getCleanUser,
  handleResponse,
  verifyToken,
  getOrSetCache,
};
