const express = require("express");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const jwt = require("jsonwebtoken");
const Application = require("../models/Application");
require("dotenv").config();

const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "quickhire_applications",
    allowed_formats: ["mp4", "mov", "webm"],
    resource_type: "video",
  },
});

const upload = multer({ storage });

// POST /apply
router.post("/", upload.single("video"), async (req, res) => {
  try {
    const token = req.cookies.jwt_token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;

    const { fullName, email, phone, message, jobId,gender } = req.body;

    // ✅ Add this debug block:

    const application = new Application({
      fullName,
      email,
      phone,
      message,
      video: req.file?.path || "",
      jobId,
      username,
      gender,
      appliedAt: new Date(),
    });

    await application.save();
    return res.status(200).json({ message: "Application submitted successfully" });
  } catch (err) {
    // ✅ Return only plain string for now
    return res.status(500).send(`Server error: ${err.message}`);
  }
});


module.exports = router;
