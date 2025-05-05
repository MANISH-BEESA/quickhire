import './index.css'
import Navbar from '../../components/Navbar'
import jobData from '../../data/jobsData'

const Home = () => {
  return (
    <div className="home-wrapper">
      <Navbar />

      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Temporary Jobs Near You</h1>
          <p>Whether you're a waiter, helper, or delivery partner — get hired fast with QuickHire. No resumes, just real work.</p>
          <button className="find-jobs-btn">Find Jobs</button>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How QuickHire Works</h2>
        <div className="how-grid">
          <div className="how-step">
            <span className="step-icon">🔍</span>
            <h4>Find Jobs</h4>
            <p>Browse jobs near you based on category and location.</p>
          </div>
          <div className="how-step">
            <span className="step-icon">📤</span>
            <h4>Apply Instantly</h4>
            <p>No resumes. Just fill your details and apply with 1 click.</p>
          </div>
          <div className="how-step">
            <span className="step-icon">💼</span>
            <h4>Get Hired</h4>
            <p>Employers will contact you directly after reviewing.</p>
          </div>
        </div>
      </section>

      <section className="latest-jobs">
        <h2>Latest Job Openings</h2>
        <div className="marquee-container">
          <div className="marquee-track">
            {jobData.concat(jobData).map((job, index) => (
              <div className="job-card" key={index}>
                <div className="job-card-header">
                  <h3 className="job-card-title">{job.title}</h3>
                  <span className={`urgency ${job.urgency_level.toLowerCase()}`}>{job.urgency_level}</span>
                </div>
                <p className="job-company"><strong>Company:</strong> {job.company}</p>
                <div className="job-meta">
                  <span>📍 {job.location}</span>
                  <span>🕐 {job.employment_type}</span>
                  <span>⏰ {job.shift_timing}</span>
                </div>
                <p className="salary">{job.package}</p>
                <p className="job-description-title">Description</p>
                <p className="job-description-text">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        © 2025 QuickHire. All rights reserved.
      </footer>
    </div>
  )
}

export default Home
