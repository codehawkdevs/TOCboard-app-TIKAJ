const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: {
    type: String,
    unique: true
  },
  first_name: String,
  last_name: String,
  tags: Array
});

const User = mongoose.model("user", userSchema);
module.exports = User;
