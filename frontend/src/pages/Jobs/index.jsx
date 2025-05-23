// src/pages/Jobs/index.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./index.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    shiftTiming: "",
    location: "",
    employmentType: "",
    sort: "",
  });
  const [searchInput, setSearchInput] = useState({
    title: "",
    location: "",
  });

  const fetchJobs = async (customFilters = {}) => {
    const query = new URLSearchParams();
    const combined = { ...filters, ...customFilters };
    Object.entries(combined).forEach(([key, value]) => {
      if (value && value !== "All" && value !== "Default") {
        query.append(key, value);
      }
    });

    try {
      const res = await fetch(`http://localhost:5174/jobs?${query.toString()}`);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    fetchJobs({
      jobTitle: searchInput.title,
      jobLocation: searchInput.location,
    });
  };

  return (
    <div className="jobs-page">
      <Navbar />
      <header className="jobs-header">
        <h1>
          Find your <span className="highlight">new job</span> today
        </h1>
        <p>Thousands of jobs for waiters, helpers, loaders, and more!</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Position you are looking for..."
            value={searchInput.title}
            onChange={(e) =>
              setSearchInput({ ...searchInput, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Location"
            value={searchInput.location}
            onChange={(e) =>
              setSearchInput({ ...searchInput, location: e.target.value })
            }
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>

      <div className="jobs-main">
        <aside className="jobs-filters">
          <h3>Filters</h3>

          <label>Shift Timing:</label>
          <select name="shiftTiming" onChange={handleRadioChange}>
            <option value="">All</option>
            <option value="Day">Day</option>
            <option value="Night">Night</option>
            <option value="Full Day">Full Day</option>
            <option value="Custom">Custom</option>
          </select>

          <label>Location:</label>
          <div className="radio-group">
            {["All", "Hyderabad", "Bangalore", "Chennai"].map((loc) => (
              <label key={loc}>
                <input
                  type="radio"
                  name="location"
                  value={loc}
                  onChange={handleRadioChange}
                />
                {loc}
              </label>
            ))}
          </div>

          <label>Employment Type:</label>
          <div className="radio-group">
            {["All", "1 day", "1 week", "Until completion"].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  name="employmentType"
                  value={type}
                  onChange={handleRadioChange}
                />
                {type}
              </label>
            ))}
          </div>

          <label>Sort by:</label>
          <div className="radio-group">
            {["Default", "Recently Added", "Oldest"].map((sort) => (
              <label key={sort}>
                <input
                  type="radio"
                  name="sort"
                  value={
                    sort === "Recently Added"
                      ? "recent"
                      : sort === "Oldest"
                      ? "oldest"
                      : ""
                  }
                  onChange={handleRadioChange}
                />
                {sort}
              </label>
            ))}
          </div>
        </aside>

        <section className="jobs-results">
          {jobs.length === 0 ? (
            <p className="no-results">No jobs found.</p>
          ) : (
            jobs.map((job) => (
              <Link to={`/jobs/${job._id}`} className="job-link" key={job._id}>
                <div className="job-card">
                  <div className="card-header">
                    <img
                      src={job.companyLogo || "/placeholder-logo.png"}
                      alt={`${job.postedBy} logo`}
                      className="company-logo"
                    />
                    <div className="title-section">
                      <h3 className="job-title">{job.jobTitle}</h3>
                      <br />
                      <p className="company-name"><strong>Company: </strong>{job.postedBy}</p>
                    </div>
                  </div>

                  <div className="job-tags">
                    {job.category && <span className="tag">{job.category}</span>}
                    {job.employmentType && (
                      <span className="tag">{job.employmentType}</span>
                    )}
                    {job.shiftTiming && (
                      <span className="tag">{job.shiftTiming} Shift</span>
                    )}
                  </div>

                  <p className="job-meta">
                    📍 {job.jobLocation}
                    {job.salary && <>&nbsp; | 💰 {job.salary}</>}
                  </p>

                  <p className="job-meta posted">
                    Posted on:{" "}
                    {new Date(job.datePosted).toLocaleDateString()}
                  </p>

                  <div className="description-row">
                    <strong>Description</strong>
                  </div>
                  <p className="desc-preview">
                    {job.jobDescription?.length > 100
                      ? `${job.jobDescription.substring(0, 100)}...`
                      : job.jobDescription}
                  </p>
                </div>
              </Link>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default Jobs;
