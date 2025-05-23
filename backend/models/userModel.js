// backend/models/User.js
const mongoose = require('mongoose');

// Base64 placeholder (truncated here – use your full string)
const DEFAULT_IMAGE = "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg"

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname:  { type: String, required: true },
  username:  { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  gender:    { type: String, required: true },
  image:     { type: String, default: DEFAULT_IMAGE },
});

module.exports = mongoose.model('User', userSchema);
