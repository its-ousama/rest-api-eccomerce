const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  imageUrl: {
    // image URL definition here
  },
  email: {
    // email definition here
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  inventory: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("userSchema", userSchema);
