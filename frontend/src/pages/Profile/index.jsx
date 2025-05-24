// src/pages/Profile/Profile.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./index.css";

const API_URL = "http://localhost:5174";
const DEFAULT_AVATAR="https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg"

const Profile = () => {
  const [user, setUser] = useState({});
  const [jobsPosted, setJobsPosted] = useState([]);
  const [applications, setApplications] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [activeTab, setActiveTab] = useState("applied"); // "applied" or "posted"

  // editing state
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    gender: "",
  });
  const [preview, setPreview] = useState(DEFAULT_AVATAR);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/profile`, {
          credentials: "include",
        });
        const data = await res.json();
        setDataFetched(true);
        if (!data.error) {
          setUser(data.user);
          setJobsPosted(data.jobsPosted);
          setApplications(data.applications);
          setForm({
            firstname: data.user.firstname,
            lastname:  data.user.lastname,
            gender:    data.user.gender,
          });
          setPreview(data.user.image||DEFAULT_AVATAR);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setDataFetched(true);
      }
    })();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSaveProfile = async () => {
    const formData = new FormData();
    formData.append("firstname", form.firstname);
    formData.append("lastname",  form.lastname);
    formData.append("gender",    form.gender);
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (!data.error) {
        setUser(data.user);
        setIsEditing(false);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Save failed");
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`${API_URL}/jobs/${jobId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await res.json();
      if (!result.error) {
        setJobsPosted((prev) => prev.filter((j) => j._id !== jobId));
      } else {
        alert("Delete failed: " + result.error);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed");
    }
  };

  const handleEditJob = (jobId) => {
    window.location.href = `/jobs/${jobId}/edit`;
  };

  const handleViewJob = (jobId) => {
    window.location.href = `/jobs/${jobId}`;
  };

  if (!dataFetched) return null;

  return (
    <>
      <Navbar />
      <div className="profile-wrapper">
        {/* Profile Header / Edit Form */}
        <div className="profile-header">
          {isEditing ? (
            <>
              <div className="avatar-edit">
                <img src={preview} alt="Preview" className="avatar" />
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </div>
              <input
                className="text-input"
                placeholder="First Name"
                value={form.firstname}
                onChange={(e) => setForm({ ...form, firstname: e.target.value })}
              />
              <input
                className="text-input"
                placeholder="Last Name"
                value={form.lastname}
                onChange={(e) => setForm({ ...form, lastname: e.target.value })}
              />
              <select
                className="text-input"
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <button className="btn save" onClick={handleSaveProfile}>
                Save
              </button>
              <button className="btn cancel" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <img src={user.image} alt="Avatar" className="avatar" />
              <h1 className="name">
                {user.firstname} {user.lastname}
              </h1>
              <p className="handle">Email:{user.username}</p>
              <button
                className="btn edit-profile"
                onClick={() => setIsEditing(true)}
                style={{background: "#3b82f6", color: "#fff",}}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={activeTab === "applied" ? "tab active" : "tab"}
            onClick={() => setActiveTab("applied")}
          >
            Jobs Applied
          </button>
          <button
            className={activeTab === "posted" ? "tab active" : "tab"}
            onClick={() => setActiveTab("posted")}
          >
            Jobs Posted
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "applied" ? (
            applications.length > 0 ? (
              <div className="list">
                {applications.map((app) => (
                  <div className="list-item" key={app._id}>
                    <div className="info">
                      <span className="status">Applied</span>
                      <h4>{app.jobId?.jobTitle || "Deleted Job"}</h4>
                      <p className="sub">
                        {app.jobId?.postedBy} | {app.jobId?.jobLocation}
                      </p>
                      <button
                        className="btn view"
                        onClick={() => handleViewJob(app.jobId._id)}
                      >
                        View
                      </button>
                    </div>
                    {app.jobId?.companyLogo && (
                      <img
                        src={app.jobId.companyLogo}
                        alt="Logo"
                        className="company-logo"
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-msg">No applications yet.</p>
            )
          ) : jobsPosted.length > 0 ? (
            <div className="list">
              {jobsPosted.map((job) => (
                <div className="list-item" key={job._id}>
                  <div className="info">
                    <Link
                      to={`/jobs/${job._id}/applications`}
                      className="job-link"
                    >
                      <h4>{job.jobTitle}</h4>
                    </Link>
                    <p className="sub">{job.jobLocation}</p>
                    <span className="salary">💰 {job.salary}</span>
                  </div>
                  {job.companyLogo && (
                    <img
                      src={job.companyLogo}
                      alt="Logo"
                      className="company-logo"
                    />
                  )}
                  <div className="actions">
                    <button
                      className="btn edit"
                      onClick={() => handleEditJob(job._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn delete"
                      onClick={() => handleDelete(job._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-msg">No jobs posted yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
