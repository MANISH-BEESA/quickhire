const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
router.get("/jobs", async (req, res) => {
  try {
    const {
      category,
      shiftTiming,
      location,
      employmentType,
      sort,
      jobTitle,
      jobLocation,
    } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (shiftTiming) filter.shiftTiming = shiftTiming;
    if (location) filter.jobLocation = location;
    if (employmentType) filter.employmentType = employmentType;

    if (jobTitle) {
      filter.jobTitle = { $regex: new RegExp(jobTitle, "i") };
    }

    if (jobLocation) {
      filter.jobLocation = { $regex: new RegExp(jobLocation, "i") };
    }

    const sortOption = sort === "oldest" ? { datePosted: 1 } : { datePosted: -1 };

    const jobs = await Job.find(filter).sort(sortOption);

    res.status(200).json(jobs);
  } catch (err) {
    console.error("❌ Error fetching jobs:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
