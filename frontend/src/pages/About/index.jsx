import './index.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';


const AboutPage = () => (
  <div className="about-wrapper">
    <Navbar />
    <main className="about-main">
      <div className="container">
        <h1 className="page-title">About QuickHire</h1>

        <section className="about-section">
          <div className="about-grid">
            <div>
              <h2 className="section-title">Our Mission</h2>
              <p>QuickHire was founded with a simple mission: to connect skilled workers with employers quickly and efficiently, without the barriers of traditional hiring processes.</p>
              <p>We believe that skills and reliability matter more than formal resumes. Our platform makes it easy for daily-wage workers to showcase their abilities and for employers to find the help they need without unnecessary paperwork and delays.</p>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Team collaboration" className="about-img" />
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2 className="section-title center">Our Values</h2>
          <div className="value-grid">
            {[
              { title: "Accessibility", description: "Making job opportunities accessible to all skilled workers, regardless of their resume writing abilities" },
              { title: "Efficiency", description: "Streamlining the hiring process to save time for both workers and employers" },
              { title: "Transparency", description: "Providing clear information about jobs, pay rates, and expectations" },
              { title: "Fairness", description: "Creating a level playing field where skills matter more than credentials" }
            ].map((val, i) => (
              <div key={i} className="value-card">
                <h3>{val.title}</h3>
                <p>{val.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section">
          <h2 className="section-title center">The Problem We're Solving</h2>
          <div className="problem-box">
            <p>Traditional hiring processes often exclude qualified workers who may not have formal education or the ability to create professional resumes. Meanwhile, employers in many sectors struggle to find reliable workers quickly when they need them.</p>
            <p>QuickHire bridges this gap by focusing on what really matters: skills, availability, and reliability. Our platform helps:</p>
            <ul>
              <li>Daily-wage workers find consistent employment opportunities</li>
              <li>Businesses find qualified help quickly during peak times</li>
              <li>Reduce unemployment by connecting willing workers with available jobs</li>
              <li>Create a more inclusive job market that values practical skills</li>
            </ul>
            <p>By eliminating unnecessary barriers, we're making the job market more efficient and accessible for everyone involved.</p>
          </div>
        </section>

        <section className="about-section">
          <h2 className="section-title center">Join Our Community</h2>
          <p className="join-text">
            Whether you're looking for work or need to hire, QuickHire welcomes you to our growing community of skilled workers and responsible employers. Together, we're creating a more efficient and inclusive job marketplace.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default AboutPage;
