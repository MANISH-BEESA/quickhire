
import './index.css';
import { useEffect } from 'react';
import { Clock, MapPin, DollarSign, Users } from 'lucide-react';

const benefits = [
  {
    icon: <Clock className="h-10 w-10 text-quickhire-500" />,
    title: 'Quick Hiring Process',
    description: 'Get hired within hours or days, not weeks. Our streamlined process connects you with employers quickly.'
  },
  {
    icon: <MapPin className="h-10 w-10 text-quickhire-500" />,
    title: 'Local Opportunities',
    description: 'Find jobs near you, reducing commute times and making it easy to get to work.'
  },
  {
     icon: <DollarSign className="h-10 w-10 text-quickhire-500" />,
    title: 'Fair Compensation',
    description: 'Transparent salary information helps ensure you\'re paid fairly for your skills and time.'
  },
  {
   icon: <Users className="h-10 w-10 text-quickhire-500" />,
    title: 'Direct Connection',
    description: 'Connect directly with employers without middlemen taking a cut of your earnings.'
  }
];

const Benefits = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('.benefit-card');
    cards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.1}s`;
      card.classList.add('fade-up');
    });
  }, []);

  return (
    <section className="benefits-section">
      <div className="benefits-container">
        <div className="benefits-header">
          <span className="badge">Platform Benefits</span>
          <h2>Why Choose QuickHire</h2>
          <p>
            Our platform offers unique benefits for both job seekers and employers looking for quick connections.
            Join thousands of workers finding opportunities without traditional barriers.
          </p>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit, idx) => (
            <div className="benefit-card" key={idx}>
              <div className="icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;