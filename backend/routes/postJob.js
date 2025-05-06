const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Job = require("../models/Job");

// Cloudinary config
cloudinary.config({
  cloud_name: "dm19vyh7k",
  api_key: "323963592668113",
  api_secret: "u1c6RjD5N1UzEE2Ci5qIukI1fCQ",
});

// Multer + Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "quickhire-logos",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});
const upload = multer({ storage });

// POST route to handle job creation
router.post("/postJob", upload.single("companyLogo"), async (req, res) => {
  try {
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

    const companyLogoUrl = req.file ? req.file.path : null;

    const newJob = new Job({
      jobTitle,
      postedBy,
      companyLogo: companyLogoUrl,
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
    });

    await newJob.save();
    res.status(201).json({ message: "Job posted successfully!" });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ error: "Failed to post job" });
  }
});

module.exports = router;
