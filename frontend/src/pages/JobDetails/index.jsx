import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./index.css";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5174/jobs/${id}`);
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error("Error fetching job:", err);
      }
    };
    fetchJob();
  }, [id]);

  if (!job) return <p>Loading job details...</p>;

  return (
    <>
      <Navbar />
      <div className="jobdetails-container">
        <h1 className="jobdetails-title">{job.jobTitle}</h1>
        <p className="jobdetails-postedby">
          Posted by: <strong>{job.postedBy}</strong>
        </p>

        <div className="jobdetails-tags-bar">
          <span>📍 {job.jobLocation}</span>
          <span>🕒 {job.shiftTiming}</span>
          <span>⏱ {job.employmentType}</span>
          <span>📅 {new Date(job.datePosted).toLocaleDateString()}</span>
        </div>

        <p className="jobdetails-salary">💰 Salary: ₹{job.salaryPackage}</p>

        <div className="jobdetails-extra-info">
          <p><strong>Description:</strong></p>
          <p className="jobdetails-description">{job.jobDescription}</p>

          <hr className="jobdetails-divider" />

          <div className="jobdetails-info-grid">
            <div><strong>🚨 Urgency:</strong> {job.urgencyLevel}</div>
            <div><strong>⏰ Work Hours:</strong> {job.workHours}</div>
            <div><strong>📆 Expires On:</strong> {job.jobExpiryDate}</div>
            <div><strong>👥 Openings:</strong> {job.numberOfOpenings}</div>
            <div><strong>📧 Business Email : </strong> {job.email}</div>
            <div><strong>📞 Contact:</strong> {job.contactNumber}</div>
          </div>
        </div>

        <button className="jobdetails-apply-button">Apply Now</button>
      </div>
    </>
  );
};

export default JobDetails;
