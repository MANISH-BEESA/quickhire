import './index.css';
import Navbar from '../../components/Navbar';
import jobData from '../../data/jobsData';
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from 'lucide-react';
import Footer from '../../components/Footer';
import Benefits from '../../components/Benefits';
import image1 from "../../assets/image1.png"

const steps = [
  {
    title: "For Job Seekers",
    subtitle: "Find work without barriers",
    items: [
      'Browse jobs that match your abilities',
      'Apply without uploading a resume',
      'Connect directly with employers',
      'Start working quickly'
    ],
    actionText: "Find Jobs",
    actionLink: "/jobs",
    image: "https://cdn6.dissolve.com/p/D145_32_104/D145_32_104_1200.jpg"
    // Image shows a man wearing a construction vest on-site
  },
  {
    title: "For Employers",
    subtitle: "Hire talent fast when you need it",
    items: [
      'Post job openings with clear requirements',
      'Review applications based on skills and availability',
      'Connect with candidates directly',
      'Hire workers quickly for urgent needs',
      'Find reliable staff without formal resumes'
    ],
    actionText: "Post a Job",
    actionLink: "/PostJob",
    image: "https://www.westend61.de/images/0001717598pw/mature-warehouse-supervisor-instructing-his-colleague-while-doing-inventory-control-two-logistics-employees-working-together-in-a-large-distribution-centre-JLPPF01330.jpg"
    // Image shows a supervisor instructing warehouse workers
  }
];



const Home = () => {
  const navigate = useNavigate();

  const handleFindJobs = () => {
    navigate("/jobs");
  };

  return (
    <div className="home-wrapper">
      <Navbar />

<section className="hero-section">
  <div className="hero-container">
    <div className="hero-left">
      <h1>
        <span className="brand-name">QuickHire –</span><br />
        <span className="main-highlight">Work Without a Resume</span>
      </h1>
      <p className="hero-subtext">
        Connecting skilled workers with immediate job opportunities.
        No resume needed, just skills and willingness to work.
      </p>
      <ul className="hero-features">
        <li>✔ Hire within hours</li>
        <li>✔ Local opportunities</li>
        <li>✔ Flexible timing</li>
      </ul>
      <div className="hero-buttons">
        <button className="btn primary" onClick={() => navigate('/jobs')}>Find Jobs</button>
        <button className="btn secondary" onClick={() => navigate('/post-job')}>Post a Job</button>
      </div>
    </div>

    {/* New right‐side image */}
    <div className="hero-right">
      <img
        src={image1}
        alt="Worker on site"
      />
    </div>
  </div>
</section>






      <section className="detailed-how-section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg">How QuickHire Works</h2>
            <p className="description">
              Our platform makes it easy to connect workers with employers, eliminating the barriers of traditional hiring processes and getting you started in just a few simple steps.
            </p>
          </div>

          <div className="steps-container">
            {steps.map((step, idx) => (
              <div key={step.title} className={`step-block ${idx % 2 === 0 ? 'normal' : 'reverse'}`}>
                <div className="step-text">
                  <div className="step-badge">
                    <span className="step-number">{idx + 1}</span>
                    {step.title}
                  </div>

                  <h3>{step.subtitle}</h3>

                  <ul>
                    {step.items.map((item, i) => (
                      <li key={i}>
                        <CheckCircle className="icon-check" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to={step.actionLink} className="step-action-link">
                    {step.actionText} <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="step-image-wrapper">
                  <div className="step-image-bg" />
                  <img src={step.image} alt={step.title} className="step-image" />
                  <div className={`stat-box ${idx % 2 === 0 ? 'right' : 'left'}`}>
                    <div className="stat-number">{idx === 0 ? "4,500+" : "2,000+"}</div>
                    <p>{idx === 0 ? "People found jobs through QuickHire last month" : "Jobs posted by employers in the past 30 days"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

<Benefits />

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
            <Footer/>
    </div>
  );
};

export default Home;
