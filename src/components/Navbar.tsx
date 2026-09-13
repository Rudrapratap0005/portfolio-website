import React, { useState, useEffect } from 'react';
import { Search, Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { PERSONAL_INFO } from '../data/portfolioData';
import '../styles/Navbar.css';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  playClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  soundEnabled,
  toggleSound,
  playClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sectionIds = ['hero', 'projects', 'skills', 'certifications', 'experience', 'testimonials', 'contact'];
  const activeSection = useScrollSpy(sectionIds, 150);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        {/* Brand */}
        <a
          href="#hero"
          className="navbar-brand"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          aria-label="Rudra Pratap Shukla Home"
        >
          <div className="brand-emblem">RP</div>
          <div className="brand-info">
            <span className="brand-name">{PERSONAL_INFO.name}</span>
            <span className="brand-status">
              <span className="status-dot"></span>
              Open to Software Roles
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Main navigation">
          <ul className="nav-menu">
            <li>
              <button
                className={`nav-link ${activeSection === 'hero' || activeSection === '' ? 'active' : ''}`}
                onClick={() => handleNavClick('hero')}
              >
                Overview
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                onClick={() => handleNavClick('projects')}
              >
                Projects
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                onClick={() => handleNavClick('skills')}
              >
                Skills
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${activeSection === 'certifications' ? 'active' : ''}`}
                onClick={() => handleNavClick('certifications')}
              >
                Certifications
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
                onClick={() => handleNavClick('experience')}
              >
                Journey
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>

        {/* Right Controls */}
        <div className="nav-actions">
          {/* Command Palette Trigger */}
          <button
            className="cmd-k-btn"
            onClick={() => {
              playClick();
              onOpenCommandPalette();
            }}
            title="Open Command Palette (Cmd + K)"
            aria-label="Search and command palette"
          >
            <Search size={15} />
            <span>Search</span>
            <kbd className="kbd-badge">⌘K</kbd>
          </button>

          {/* Sound Toggle */}
          <button
            className={`icon-toggle-btn ${soundEnabled ? 'active' : ''}`}
            onClick={() => {
              toggleSound();
              playClick();
            }}
            title={soundEnabled ? 'Mute audio cues' : 'Enable audio cues'}
            aria-label={soundEnabled ? 'Mute audio' : 'Enable audio'}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            className="icon-toggle-btn mobile-menu-toggle"
            onClick={() => {
              playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="mobile-drawer-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
            <div>
              <div className="mobile-drawer-header">
                <div className="brand-emblem">RP</div>
                <button
                  className="icon-toggle-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              <ul className="mobile-nav-links">
                <li>
                  <button
                    className={`mobile-nav-link ${activeSection === 'hero' ? 'active' : ''}`}
                    onClick={() => handleNavClick('hero')}
                  >
                    Overview
                  </button>
                </li>
                <li>
                  <button
                    className={`mobile-nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                    onClick={() => handleNavClick('projects')}
                  >
                    Projects
                  </button>
                </li>
                <li>
                  <button
                    className={`mobile-nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                    onClick={() => handleNavClick('skills')}
                  >
                    Skills
                  </button>
                </li>
                <li>
                  <button
                    className={`mobile-nav-link ${activeSection === 'certifications' ? 'active' : ''}`}
                    onClick={() => handleNavClick('certifications')}
                  >
                    Certifications
                  </button>
                </li>
                <li>
                  <button
                    className={`mobile-nav-link ${activeSection === 'experience' ? 'active' : ''}`}
                    onClick={() => handleNavClick('experience')}
                  >
                    Career & Education
                  </button>
                </li>
                <li>
                  <button
                    className={`mobile-nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                    onClick={() => handleNavClick('contact')}
                  >
                    Initiate Contact
                  </button>
                </li>
              </ul>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                className="btn btn-glow"
                style={{ width: '100%' }}
                onClick={() => {
                  handleNavClick('contact');
                }}
              >
                <Sparkles size={16} />
                <span>Get In Touch</span>
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
