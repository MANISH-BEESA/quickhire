import React, { useEffect, useState } from "react";
import "./index.css";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [jobsPosted, setJobsPosted] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      const res = await fetch("http://localhost:5174/profile", {
        method: "GET",
        credentials: "include", // send cookies with request
      });

      const data = await res.json();
      if (data.error) {
        alert("Not authorized. Please log in.");
        return;
      }

      setUsername(data.username);
      setJobsPosted(data.jobsPosted || []);
      setApplications(data.applications || []);
    };

    fetchProfileData();
  }, []);

  return (
    <div className="profile-container">
      <h2 className="profile-title">👤 Welcome, {username}</h2>

      <div className="section">
        <h3>📌 Jobs You Posted</h3>
        <div className="cards-container">
          {jobsPosted.length > 0 ? jobsPosted.map(job => (
            <div className="card" key={job._id}>
              <h4>{job.jobTitle}</h4>
              <p>{job.jobLocation} • {job.shiftTiming}</p>
              <span className="label">💰 {job.salaryPackage}</span>
            </div>
          )) : <p>No jobs posted yet.</p>}
        </div>
      </div>

      <div className="section">
        <h3>📄 Jobs You Applied</h3>
        <div className="cards-container">
          {applications.length > 0 ? applications.map(app => (
            <div className="card" key={app._id}>
              <h4>{app.jobId?.jobTitle || "Deleted Job"}</h4>
              <p>{app.jobId?.jobLocation} • {app.jobId?.shiftTiming}</p>
              <span className="label">📅 Applied on: {new Date(app.appliedAt).toLocaleDateString()}</span>
            </div>
          )) : <p>No applications submitted yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
