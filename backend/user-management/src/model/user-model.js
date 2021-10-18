const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: mongoose.SchemaTypes.ObjectId,
  password: String,
  username: String,
  email: String,
  isAdmin: Boolean,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
