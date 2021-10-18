// Using .env file
require("dotenv").config();

// Dependencies
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const router = express.Router();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const { handleResponse } = require("./utils/utils");

const app = express();
const port = process.env.PORT || 4000;
// Connect to mongodb
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("[User Management MongoDB] Connection Successful!"))
  .catch((err) =>
    console.error(
      `[User Management MongDB] There was an error in connection: ${err}`
    )
  );

// Enable CORS
app.use(cors());
// Parse Application/Json
app.use(express.json());
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Using auth routes
app.use("/auth", authRoutes);

// Middleware to check if Jwt Token exists and verifies it if it does
// All the private route, this will help to know if the request is authenticated
const authMiddleware = function (request, response, next) {
  // Check header or URL parameter or POST parameter for token
  var token = request.headers["authorization"];

  if (!token) {
    return handleResponse(request, response, 401); // If not token, continue
  }

  token = token.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return response
        .status(401)
        .json({ error: true, message: "Invalid User." });
    } else {
      request.user = user; // Set the user to request so that other routes can use it
      next();
    }
  });
};

// Using auth routes
app.use("/users", authMiddleware, userRoutes);

app.listen(port, () => {
  console.log("Server started on: " + port);
});

module.exports = app;
