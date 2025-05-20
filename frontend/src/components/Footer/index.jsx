import {Link} from 'react-router-dom'
import './index.css'

const Footer = () => (
  <footer className="footer">
    <div className="container footer-grid">
      <div>
        <Link to="/" className="logo">
          <span>QuickHire</span>
        </Link>
        <p>Connecting skilled workers with job opportunities, no resume needed.</p>
      </div>
      <div>
        <h3>Navigation</h3>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/jobs">Browse Jobs</Link></li>
          <li><Link to="/post-job">Post a Job</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
   <div>
  <h3 className="footer-heading">Explore</h3>
  <ul>
    <li>FAQs</li>
    <li>Blog</li>
    <li>Terms of Service</li>
    <li>Privacy Policy</li>
    <li>Help & Support</li>
  </ul>
</div>

      <div>
        <h3>Contact Us</h3>
        <ul>
          <li>Email: support@quickhire.com</li>
          <li>Phone: +1 (555) 123-4567</li>
          <li>Address: 123 Main St, City</li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      &copy; {new Date().getFullYear()} QuickHire. All rights reserved.
    </div>
  </footer>
);

export default Footer