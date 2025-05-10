import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Profile = () => {
  const [user, setUser] = useState({});
  const [jobsPosted, setJobsPosted] = useState([]);
  const [applications, setApplications] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5174/profile", {
        credentials: "include",
      });
      const data = await res.json();
      setDataFetched(true);
      if (!data.error) {
        setUser(data);
        setJobsPosted(data.jobsPosted || []);
        setApplications(data.applications || []);
      }
    };
    fetchData();
  }, []);

  return (
    dataFetched && (
      <div className="profile-wrapper">
        <div className="profile-card">
          <div className="profile-img-section">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Profile"
              className="profile-pic"
            />
            <button className="edit-pic-btn">✏️ Edit</button>
          </div>
          <div className="profile-info">
            <h2>{user?.user?.firstname} {user?.user?.lastname}</h2>
            <p className="username">@{user?.user?.username}</p>
            <p className="email">📧 {user?.user?.email || 'Not provided'}</p>
            <p className="phone">📞 {user?.user?.phone || 'N/A'}</p>
            <p className="role">🎓 Role: {user?.user?.role || "User"}</p>
            <p className="bio">🚀 Bio: Passionate learner and aspiring tech leader!</p>
            <div className="profile-actions">
              <button className="btn edit">Edit Profile</button>
              <button className="btn logout">Logout</button>
            </div>
          </div>
        </div>

        <div className="section">
          <h3>📌 Jobs You Posted</h3>
          <div className="card-grid">
            {jobsPosted.length ? (
              jobsPosted.map((job) => (
                <Link to={`/jobs/${job._id}/applications`} key={job._id} className="job-card">
                  <h4>{job.jobTitle}</h4>
                  <p><strong>Location:</strong> {job.jobLocation}</p>
                  <p><strong>Shift:</strong> {job.shiftTiming}</p>
                  <span>💰 {job.salaryPackage}</span>
                </Link>
              ))
            ) : (
              <p className="empty-msg">No jobs posted yet.</p>
            )}
          </div>
        </div>

        <div className="section">
          <h3>📄 Jobs You Applied For</h3>
          <div className="card-grid">
            {applications.length ? (
              applications.map((app) => (
                <div className="job-card" key={app._id}>
                  <h4>{app.jobId?.jobTitle || "Deleted Job"}</h4>
                  <p><strong>Location:</strong> {app.jobId?.jobLocation}</p>
                  <p><strong>Shift:</strong> {app.jobId?.shiftTiming}</p>
                  <span>📅 Applied: {new Date(app.appliedAt).toLocaleDateString()}</span>
                  {app.video && (
                    <a href={app.video} target="_blank" rel="noreferrer" className="video-link">🎥 Watch Video</a>
                  )}
                </div>
              ))
            ) : (
              <p className="empty-msg">No applications yet.</p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
