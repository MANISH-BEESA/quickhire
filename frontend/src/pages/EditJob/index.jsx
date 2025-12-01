import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./index.css";      // same styles as PostAJob

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: "",
    postedBy: "",
    companyLogo: null,
    jobDescription: "",
    jobLocation: "",
    salaryPackage: "",
    shiftTiming: "",
    urgencyLevel: "",
    category: "",
    employmentType: "",
    contactNumber: "",
    email: "",
    locationPin: "",
    workHours: "",
    jobExpiryDate: "",
    numberOfOpenings: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // 1️⃣ Load the job data once
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs/${id}`, {
          credentials: "include",
        });
        const job = await res.json();
        // prefill, slicing date to yyyy-mm-dd for the input
        setFormData({
          jobTitle: job.jobTitle || "",
          postedBy: job.postedBy || "",
          companyLogo: null,            // leave file blank by default
          jobDescription: job.jobDescription || "",
          jobLocation: job.jobLocation || "",
          salaryPackage: job.salaryPackage || "",
          shiftTiming: job.shiftTiming || "",
          urgencyLevel: job.urgencyLevel || "",
          category: job.category || "",
          employmentType: job.employmentType || "",
          contactNumber: job.contactNumber || "",
          email: job.email || "",
          locationPin: job.locationPin || "",
          workHours: job.workHours || "",
          jobExpiryDate: job.jobExpiryDate
            ? job.jobExpiryDate.slice(0, 10)
            : "",
          numberOfOpenings: job.numberOfOpenings || "",
        });
      } catch (err) {
        console.error("Failed to load job:", err);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((fd) => ({
      ...fd,
      [name]: files ? files[0] : value,
    }));
  };

  // 2️⃣ Submit edits
const handleSubmit = async (e) => {
    e.preventDefault();
    // Remove file field entirely if you aren't re-uploading
    const { companyLogo, ...payload } = formData;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs/${id}`, {
       method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (res.ok) {
        setMessage("✅ Job updated successfully!");
        setTimeout(() => navigate("/profile"), 1500);
     } else {
       throw new Error(result.error || "Update failed");
     }
    } catch (err) {
     console.error(err);
      setIsError(true);
    setMessage(`❌ ${err.message}`);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <>
      <Navbar />
      <div className="post-job-container">
        <h2 className="form-heading">✏️ Edit Job</h2>
        <form
          className="form-grid"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {/* — all your same form fields from PostAJob — */}
          <div className="form-field">
            <label>Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Posted by</label>
            <input
              type="text"
              name="postedBy"
              value={formData.postedBy}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Company Logo (optional)</label>
            <input
              type="file"
              name="companyLogo"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Job Location</label>
            <input
              type="text"
              name="jobLocation"
              value={formData.jobLocation}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Salary / Package</label>
            <div className="currency-input">
              <span className="currency-symbol">₹</span>
              <input
                type="text"
                name="salaryPackage"
                value={formData.salaryPackage}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-field">
            <label>Shift Timing</label>
            <select
              name="shiftTiming"
              value={formData.shiftTiming}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option>Day</option>
              <option>Night</option>
              <option>Full Day</option>
              <option>Custom</option>
            </select>
          </div>

          <div className="form-field">
            <label>Urgency Level</label>
            <select
              name="urgencyLevel"
              value={formData.urgencyLevel}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option>Urgent</option>
              <option>Flexible</option>
              <option>Scheduled</option>
            </select>
          </div>

          <div className="form-field">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Employment Type</label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option>1 day</option>
              <option>1 week</option>
              <option>Until completion</option>
            </select>
          </div>

          <div className="form-field">
            <label>Work Hours / Shift Duration</label>
            <input
              type="text"
              name="workHours"
              value={formData.workHours}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Job Expiry Date</label>
            <input
              type="date"
              name="jobExpiryDate"
              value={formData.jobExpiryDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Number of Openings</label>
            <input
              type="number"
              name="numberOfOpenings"
              value={formData.numberOfOpenings}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Location Pin (optional)</label>
            <input
              type="text"
              name="locationPin"
              value={formData.locationPin}
              onChange={handleChange}
            />
          </div>

          <div className="form-description">
            <label>Job Description</label>
            <textarea
              name="jobDescription"
              rows="4"
              value={formData.jobDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-submit">
            <button type="submit">💾 Save Changes</button>
          </div>

          {message && (
            <p className={`response-message ${isError ? "error" : "success"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default EditJob;
