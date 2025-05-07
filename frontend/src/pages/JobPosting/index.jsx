import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./index.css";

const PostAJob = () => {
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
  const navigate = useNavigate()
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("posted")
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const response = await fetch("http://localhost:5174/postJob", {
        method: "POST",
        body: data,
        credentials: "include",
      });
      const result = await response.json();

      if (response.ok) {
        setIsError(false);
        setMessage("✅ Job posted successfully!");
        setTimeout(() => setMessage(""), 3000);
        setFormData({
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
        setTimeout(()=>navigate("/"),3500)
      } else {
        setIsError(true);
        setMessage(`❌ ${result.error || "Failed to post job."}`);
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsError(true);
      setMessage("❌ Failed to post job. Try again.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <>
      <Navbar />
      <div className="post-job-container">
        <h2 className="form-heading">📝 Post a Job</h2>
        <form
          className="form-grid"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form-field">
            <label>Job Title</label>
            <input
              type="text"
              name="jobTitle"
              placeholder="e.g., Waiter, Loader"
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
              placeholder="Company or Individual Name"
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
              placeholder="City + optional pin code"
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
                placeholder="e.g., 12000 or 'To be discussed'"
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
              placeholder="e.g., Waiter, Kitchen Helper"
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
              placeholder="e.g., 9 AM – 6 PM"
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
              placeholder="e.g., 5"
              value={formData.numberOfOpenings}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              placeholder="Optional"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your email"
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
              placeholder="Map pin code"
              value={formData.locationPin}
              onChange={handleChange}
            />
          </div>

          <div className="form-description">
            <label>Job Description</label>
            <textarea
              name="jobDescription"
              rows="4"
              placeholder="Enter short but clear job description"
              value={formData.jobDescription}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-submit">
            <button type="submit">📤 Post Job</button>
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

export default PostAJob;
