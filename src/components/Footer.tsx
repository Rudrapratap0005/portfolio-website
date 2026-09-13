import React from 'react';
import { ArrowUp, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import '../styles/Footer.css';

interface FooterProps {
  playClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ playClick }) => {
  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#ffffff' }}>
              {PERSONAL_INFO.name}
            </span>
            <div className="footer-status-badge">
              <ShieldCheck size={14} />
              <span>All Systems Nominal • 99.99% Architecture SLA</span>
            </div>
          </div>

          <div className="footer-links-row">
            <a href="#hero" className="footer-link">Overview</a>
            <a href="#projects" className="footer-link">Case Studies</a>
            <a href="#skills" className="footer-link">Skills Matrix</a>
            <a href="#experience" className="footer-link">Career</a>
            <a href="#contact" className="footer-link">Contact</a>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React 19, TypeScript, Vanilla CSS Tokens & Framer Motion.
          </div>

          <button
            className="back-to-top-btn"
            onClick={scrollToTop}
            title="Return to the top"
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};
