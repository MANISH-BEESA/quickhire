import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";

const JobApplicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      const res = await fetch(`http://localhost:5174/jobs/${jobId}/applications`);
      const data = await res.json();
      setApplicants(data);
    };
    fetchApplicants();
  }, [jobId]);

  return (
    <div className="applicants-page">
      <h2>👥 Applicants for this Job</h2>
      {applicants.length ? (
        applicants.map((app) => (
          <div className="applicant-card" key={app._id}>
            <p><strong>Full Name:</strong> {app.fullName}</p>
            <p><strong>Email:</strong> {app.email}</p>
            <p><strong>Phone:</strong> {app.phone}</p>
            {app.gender && <p><strong>Gender:{app.gender}</strong></p>}
            {app.video && (
              <a href={app.video} target="_blank" rel="noreferrer">🎥 Watch Video</a>
            )}
            <p><strong>Message:</strong> {app.message}</p>
          </div>
        ))
      ) : (
        <p>No one has applied yet.</p>
      )}
    </div>
  );
};

export default JobApplicants;
