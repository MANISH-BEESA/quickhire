const express = require("express");
const jwt = require("jsonwebtoken");
const Job = require("../models/Job");
const Application = require("../models/Application");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const token = req.cookies.jwt_token; // ✅ extract using cookie-parser

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ verify
    const username = decoded.username;

    // ✅ Fetch jobs posted by the user
    const jobsPosted = await Job.find({ postedByUsername: username });

    // ✅ Fetch applications made by the user
    const applications = await Application.find({ username }).populate("jobId");

    res.status(200).json({
      username,
      jobsPosted,
      applications,
    });
  } catch (err) {
    console.error("❌ Error fetching profile data:", err.message);
    res.status(401).json({ error: "Unauthorized" });
  }
});

module.exports = router;
