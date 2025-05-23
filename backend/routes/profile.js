// backend/routes/profile.js
const express = require("express");
const jwt     = require("jsonwebtoken");
const multer  = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const User    = require("../models/userModel");
const Job     = require("../models/Job");
const App     = require("../models/Application");

require("dotenv").config();

// configure Cloudinary
cloudinary.config({
  cloud_name:   process.env.CLOUDINARY_CLOUD_NAME,
  api_key:      process.env.CLOUDINARY_API_KEY2,
  api_secret:   process.env.CLOUDINARY_API_SECRET2,
});

// multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user_profiles",
    allowed_formats: ["jpg", "png"],
  },
});
const upload = multer({ storage });

const router = express.Router();

// auth middleware
function requireAuth(req, res, next) {
  const token = req.cookies.jwt_token;
  if (!token) return res.status(401).json({ error: "No token provided" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// GET /profile
router.get("/", requireAuth, async (req, res) => {
  try {
    const { username } = req.user;
    const user = await User.findOne({ username }).lean();
    if (!user) return res.status(404).json({ error: "User not found" });

    const jobsPosted    = await Job.find({ postedByUsername: username }).lean();
    const applications  = await App.find({ username }).populate("jobId").lean();
       user.image = user.image || User.schema.path("image").defaultValue;
    res.json({ user, jobsPosted, applications });
  } catch (err) {
    console.error("GET /profile error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /profile — accept multipart/form-data with optional `image` file
router.put(
  "/",
  requireAuth,
  upload.single("image"),
  async (req, res) => {
    try {
      const { username } = req.user;
      // text fields come in req.body
      const { firstname, lastname, gender } = req.body;

      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ error: "User not found" });

      if (firstname) user.firstname = firstname;
      if (lastname)  user.lastname  = lastname;
      if (gender)    user.gender    = gender;
      // if we got an image upload, multer-storage-cloudinary has put its URL in req.file.path
      if (req.file && req.file.path) {
        user.image = req.file.path;
      }

      await user.save();
      res.json({ user });
    } catch (err) {
      console.error("PUT /profile error:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
