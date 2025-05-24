import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";

const ApplyForm = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [message, setMessage] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const navigate = useNavigate();

  // form values
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    gender: "",
    video: null,
  });

  // per-field error messages
  const [errors, setErrors] = useState({});

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
    setFormData((fd) => ({
      ...fd,
      [name]: files ? files[0] : value,
    }));
    setErrors((errs) => ({ ...errs, [name]: "" })); // clear error on user edit
  };

  // Validate required fields + phone format + video presence
  const validate = () => {
    const errs = {};

    if (!formData.fullName.trim()) {
      errs.fullName = "Full name is required.";
    }

    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Enter a valid email.";
    }

    if (!formData.phone.trim()) {
      errs.phone = "Phone is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errs.phone = "Phone must be 10 digits.";
    }

    if (!formData.video) {
      errs.video = "Please upload a short intro video.";
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return; // stop here until the user fixes errors
    }

    // all good → proceed to send
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
        setMessage("You applied successfully!");
        setDataFetched(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
          gender: "",
          video: null,
        });
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage("Your application was not submitted.");
        setDataFetched(false);
      }
    } catch (err) {
      console.error("❌ Failed to parse response:", text);
      setMessage("Unexpected server error.");
      setDataFetched(false);
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
          <form className="apply-form" onSubmit={handleSubmit} noValidate>
            <label>
              Full Name
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <span className="error-message">{errors.fullName}</span>
              )}
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </label>

            <label>
              Phone
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </label>

            <label>
              Gender
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              />
            </label>

            <label>
              Message
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </label>

            <label>
              Upload Video
              <input
                type="file"
                name="video"
                accept="video/*"
                onChange={handleChange}
                required
              />
              {errors.video && (
                <span className="error-message">{errors.video}</span>
              )}
            </label>

            <button type="submit" className="apply-btn">
              Submit Application
            </button>
          </form>

          {message && (
            <p className={!dataFetched ? "error-message" : "success-message"}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyForm;
