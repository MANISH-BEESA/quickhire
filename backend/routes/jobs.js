const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Application = require("../models/Application");
router.get("/", async (req, res) => {
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
router.put("/:id",  async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });


    // update fields from req.body
    Object.assign(job, req.body);
    await job.save();

    res.json(job);
  } catch (err) {
    console.error("PUT /jobs/:id:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE a job
router.delete("/:id",  async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });


      await Application.deleteMany({ jobId: job._id });
    await Job.findByIdAndDelete(req.params.id);

    res.json({ msg: "Job deleted" });
  } catch (err) {
    console.error("DELETE /jobs/:id:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
