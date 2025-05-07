const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Job = require("../models/Job");

const router = express.Router();

// 🔐 Cloudinary Config
cloudinary.config({
  cloud_name: "dm19vyh7k",
  api_key: "323963592668113",
  api_secret: "u1c6RjD5N1UzEE2Ci5qIukI1fC",
});

// 📦 File Upload Setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "quickhire",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// 📝 POST /post-job
router.post("/postJob", upload.single("companyLogo"), async (req, res) => {
  try {
    const token = req.cookies.jwt_token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const postedByUsername = decoded.username;

    const {
      jobTitle,
      postedBy,
      jobDescription,
      jobLocation,
      salaryPackage,
      shiftTiming,
      urgencyLevel,
      category,
      employmentType,
      contactNumber,
      email,
      locationPin,
      workHours,
      jobExpiryDate,
      numberOfOpenings,
    } = req.body;

    const job = new Job({
      jobTitle,
      postedBy,
      jobDescription,
      jobLocation,
      salaryPackage,
      shiftTiming,
      urgencyLevel,
      category,
      employmentType,
      contactNumber,
      email,
      locationPin,
      workHours,
      jobExpiryDate,
      numberOfOpenings,
      postedByUsername,
      companyLogo: req.file?.path || "",
      datePosted: new Date(),
    });

    await job.save();
    res.status(200).json({ message: "Job posted successfully", job });
  } catch (err) {
    console.error("❌ Error posting job:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
