import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Copy,
  Check,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';
import { fadeInUp } from '../utils/motion';
import '../styles/Contact.css';

interface ContactProps {
  playClick: () => void;
  playSuccess: () => void;
}

export const Contact: React.FC<ContactProps> = ({ playClick }) => {
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    playClick();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyPhone = () => {
    playClick();
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <section id="contact" className="contact-section section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <Mail size={14} />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="section-title">
            Let&apos;s Build <span className="gradient-text">Exceptional Systems</span>
          </h2>
          <p className="section-subtitle">
            Whether you need a full-stack developer, want to collaborate on an open-source project, or have an exciting internship opportunity, I would love to connect.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left info */}
          <motion.div
            className="contact-info-panel"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="contact-headline">
              Get In Touch <br />
              <span className="gradient-text">& Collaborate</span>
            </h3>

            <p className="contact-bio">
              I'm actively looking for full-stack developer roles, AI engineering positions, and meaningful internship opportunities. Open to freelance projects and technical collaborations too!
            </p>

            {/* Click to Copy Email */}
            <div
              className="email-copy-box"
              onClick={handleCopyEmail}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleCopyEmail();
              }}
              title="Click to copy email address"
            >
              <div className="email-label-group">
                <span className="email-sub">EMAIL</span>
                <span className="email-address">{PERSONAL_INFO.email}</span>
              </div>
              <div className="copy-btn-icon">
                {copied ? <Check size={20} color="#10b981" /> : <Copy size={20} />}
              </div>
            </div>
            {copied && (
              <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Check size={14} /> Copied to clipboard!
              </span>
            )}
            
            {/* Click to Copy Phone */}
            <div
              className="email-copy-box"
              style={{ marginTop: '1rem' }}
              onClick={handleCopyPhone}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleCopyPhone();
              }}
              title="Click to copy phone number"
            >
              <div className="email-label-group">
                <span className="email-sub">PHONE</span>
                <span className="email-address">{PERSONAL_INFO.phone}</span>
              </div>
              <div className="copy-btn-icon">
                {copiedPhone ? <Check size={20} color="#10b981" /> : <Copy size={20} />}
              </div>
            </div>
            {copiedPhone && (
              <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: 4, marginTop: '8px' }}>
                <Check size={14} /> Copied to clipboard!
              </span>
            )}

            {/* Social Links */}
            <div>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                PROFESSIONAL NETWORKS & CODE
              </span>
              <div className="social-links-row">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill"
                  onClick={playClick}
                >
                  <GithubIcon size={16} />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill"
                  onClick={playClick}
                >
                  <LinkedinIcon size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
