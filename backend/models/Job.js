const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: String,
  postedBy: String,
  postedByUsername: String, // ✅ Add this to store JWT-based username
  companyLogo: String, // URL from Cloudinary
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
