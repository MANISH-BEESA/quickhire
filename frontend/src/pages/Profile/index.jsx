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
      console.log(data)
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
        <div className="profile-section-header">
          <div className="profile-header-text">
            <h2>
              Full Name: {user?.user?.lastname?.toUpperCase()}{" "}
              {user?.user?.firstname.toUpperCase()}
            </h2>
            <p className="profile-email">Email: {user?.user?.username}</p>
          </div>
        </div>

        <div className="profile-section">
          <h3>📌 Jobs You Posted</h3>
          <div className="profile-posted-list">
            {jobsPosted.length ? (
              jobsPosted.map((job) => (
                <Link
                  to={`/jobs/${job._id}/applications`}
                  className="profile-job-link"
                  key={job._id}
                >
                  <div className="profile-job-card">
                    <h4>{job.jobTitle}</h4>
                    <p>
                      <strong>Location:</strong> {job.jobLocation} •{" "}
                      <strong>Shift Timing:</strong> {job.shiftTiming}
                    </p>
                    <span>Salary: {job.salaryPackage}</span>
                  </div>
                </Link>
              ))
            ) : (
              <p>No jobs posted yet.</p>
            )}
          </div>

          <h3>📄 Jobs You Applied For</h3>
          <div className="profile-applied-list">
            {applications.length ? (
              applications.map((app) => (
                <div className="profile-application-card" key={app._id}>
                  <h4>{app.jobId?.jobTitle || "Deleted Job"}</h4>
                  <p>
                    <strong>Location:</strong> {app.jobId?.jobLocation} •{" "}
                    <strong>Shift Timing:</strong> {app.jobId?.shiftTiming}
                  </p>
                  <span>
                    📅 Applied: {new Date(app.appliedAt).toLocaleDateString()}
                  </span>
                  {app.video && (
                    <a
                      href={app.video}
                      className="profile-video-link"
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
