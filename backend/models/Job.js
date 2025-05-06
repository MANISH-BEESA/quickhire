const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: String,
  postedBy: String,
  companyLogo: String, // Store filename or URL
  jobDescription: String,
  jobLocation: String,
  salaryPackage: String,
  shiftTiming: String,
  urgencyLevel: String,
  category: String,
  employmentType: String,
  contactNumber: String,
  email: String,
  locationPin: String,
  workHours: String,
  jobExpiryDate: String,
  numberOfOpenings: Number,
  datePosted: {
    type: Date,
    default: Date.now, // Auto-generate
  },
});

module.exports = mongoose.model("Job", jobSchema);
