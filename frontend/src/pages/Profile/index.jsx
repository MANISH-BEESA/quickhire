import React, { useEffect, useState } from "react";
import "./index.css";

// Random profile images

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
      <div className="profile-page">
        <div className="profile-header">
          <div className="profile-text">
            <h2>
           Full Name : {user?.user?.lastname?.toUpperCase()} {user?.user?.firstname.toUpperCase()}
            </h2>
            <p className="username">Email : {user?.user?.username}</p>
          </div>
        </div>

        <div className="profile-details">
          <h3>📌 Jobs You Posted</h3>
          <div className="card-list">
            {jobsPosted.length ? (
              jobsPosted.map((job) => (
                <div className="job-card" key={job._id}>
                  <h4>{job.jobTitle}</h4>
                  <p>
                  <strong>Location:</strong> {job.jobLocation} • <strong>Shift Timing:</strong>{job.shiftTiming}
                  </p>
                  <span>Salary : {job.salaryPackage}</span>
                </div>
              ))
            ) : (
              <p>No jobs posted yet.</p>
            )}
          </div>

          <h3>📄 Jobs You Applied For</h3>
          <div className="card-list">
            {applications.length ? (
              applications.map((app) => (
                <div className="job-card" key={app._id}>
                  <h4>{app.jobId?.jobTitle || "Deleted Job"}</h4>
                  <p>
                  <strong>Location:</strong> {app.jobId?.jobLocation} • <strong>Shift Timing:</strong> {app.jobId?.shiftTiming}
                  </p>
                  <span>📅 Applied: {new Date(app.appliedAt).toLocaleDateString()}</span>
                  {app.video && (
                    <a
                      href={app.video}
                      className="video-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      🎥 Watch Video
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p>No applications submitted yet.</p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
