const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
      type: String,
      required: true,
      min: 6,
      max: 255
  },
  email: {
      type: String,
      required: true,
      min: 6,
      max: 225
  },
  password: {
      type: String,
      required: true,
      min: 6,
      max: 255
  }
});

module.exports = mongoose.model('User', userSchema);