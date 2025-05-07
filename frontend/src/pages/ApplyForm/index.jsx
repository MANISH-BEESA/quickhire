import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";

const ApplyForm = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    video: null,
  });

  useEffect(() => {
    const fetchJob = async () => {
      const res = await fetch(`http://localhost:5174/jobs/${id}`);
      const data = await res.json();
      setJob(data);
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }
    form.append("jobId", id);

    const res = await fetch("http://localhost:5174/apply", {
      method: "POST",
      body: form,
      credentials: "include",
    });
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      if (res.ok) {
        alert(data.message || "Success!");
      } else {
        alert(data.error || "Failed");
        console.error("💥 Server error:", data.details);
      }
    } catch (err) {
      console.error("❌ Failed to parse response:", text);
    }
  };

  return (
    <div className="apply-container">
      <div className="form-card">
        <div className="left-column">
          <h2>Apply for this job</h2>
          {job && (
            <div className="job-summary">
              <p><strong>Job Title:</strong> {job.jobTitle}</p>
              <p><strong>Company:</strong> {job.postedBy}</p>
              <p><strong>Location:</strong> {job.jobLocation}</p>
              <p><strong>Shift:</strong> {job.shiftTiming}</p>
            </div>
          )}
        </div>

        <div className="right-column">
          <form className="apply-form" onSubmit={handleSubmit}>
            <label>Full Name
              <input type="text" name="fullName" required onChange={handleChange} />
            </label>
            <label>Email
              <input type="email" name="email" required onChange={handleChange} />
            </label>
            <label>Phone
              <input type="tel" name="phone" onChange={handleChange} />
            </label>
            <label>Message
              <textarea name="message" onChange={handleChange}></textarea>
            </label>
            <label>Upload Video (optional)
              <input type="file" name="video" accept="video/*" onChange={handleChange} />
            </label>
            <button type="submit" className="apply-btn">Submit Application</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyForm;
