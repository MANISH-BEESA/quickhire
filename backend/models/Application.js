const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  message: String,
  video: String,
  gender:String , 
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job", // references Job model
  },
  username: String, // ✅ From JWT token (who applied)
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Application", applicationSchema);
