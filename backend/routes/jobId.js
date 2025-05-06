const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// GET /jobId/:id – Fetch job by ID
router.get("/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json(job);
  } catch (err) {
    console.error("❌ Error fetching job by ID:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

