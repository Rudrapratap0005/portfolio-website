import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Sparkles, MapPin, Clock, Download } from 'lucide-react';
import { PERSONAL_INFO, HERO_STATS } from '../data/portfolioData';
import { fadeInUp, staggerContainer, fadeInScale } from '../utils/motion';
import '../styles/Hero.css';

interface HeroProps {
  playClick: () => void;
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ playClick, onOpenResumeModal }) => {
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format India Standard Time (IST: UTC+5:30)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollTo = (id: string) => {
    playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <motion.div
          className="hero-content"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Photo */}
          <motion.div className="hero-avatar-container" variants={fadeInScale}>
            <div className="hero-avatar-wrapper">
              <img
                src={PERSONAL_INFO.profileImage}
                alt={PERSONAL_INFO.name}
                className="hero-avatar-img"
              />
            </div>
            <div className="hero-avatar-badge" title="Open to opportunities">
              <span className="pulsing-badge-dot" />
            </div>
          </motion.div>

          {/* Status Pill */}
          <motion.div className="hero-status-pill" variants={fadeInUp}>
            <Sparkles size={14} />
            <span>{PERSONAL_INFO.status}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 className="hero-title" variants={fadeInUp}>
            Hi, I&apos;m <span className="hero-title-highlight">{PERSONAL_INFO.name}</span> <br />
            {PERSONAL_INFO.role}
          </motion.h1>

          {/* Tagline */}
          <motion.p className="hero-tagline" variants={fadeInUp}>
            {PERSONAL_INFO.heroBio}
          </motion.p>

          {/* Live Context Bar */}
          <motion.div className="hero-context-bar" variants={fadeInUp}>
            <div className="hero-context-item">
              <MapPin size={14} color="#00f0ff" />
              <span>Punjab / UP, India</span>
            </div>
            <div className="hero-context-item">
              <Clock size={14} color="#a855f7" />
              <span>IST {localTime || '12:00:00 PM'}</span>
            </div>
            <div className="hero-context-item">
              <Terminal size={14} color="#10b981" />
              <span>B.Tech CSE @ LPU</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div className="hero-actions" variants={fadeInUp}>
            <button
              className="btn btn-glow"
              onClick={() => handleScrollTo('projects')}
            >
              <span>View Projects</span>
              <ArrowRight size={18} />
            </button>

            <button
              className="btn btn-outline"
              onClick={() => handleScrollTo('contact')}
            >
              <Sparkles size={16} />
              <span>Contact Me</span>
            </button>

            <button
              className="btn btn-ghost"
              onClick={() => {
                playClick();
                onOpenResumeModal();
              }}
              title="Preview technical credentials"
            >
              <Download size={16} />
              <span>View Resume</span>
            </button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div className="hero-stats-grid" variants={fadeInUp}>
            {HERO_STATS.map((stat) => (
              <div key={stat.id} className="hero-stat-card">
                <div className="hero-stat-value">{stat.value}</div>
                <div className="hero-stat-label">{stat.label}</div>
                <div className="hero-stat-sublabel">{stat.sublabel}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
