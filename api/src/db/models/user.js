const mongoose = require("../connection");
const Schema = mongoose.Schema;

const userSchema = new Schema({

  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },

});

const user = mongoose.model("user", userSchema);
module.exports = user;
