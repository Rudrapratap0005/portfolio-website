import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X, Eye, CheckCircle } from 'lucide-react';
import { CERTIFICATES } from '../data/portfolioData';
import type { CertificateItem } from '../types';
import { fadeInUp, staggerContainer, modalVariants, backdropVariants } from '../utils/motion';
import '../styles/Certifications.css';

interface CertificationsProps {
  playClick: () => void;
}

export const Certifications: React.FC<CertificationsProps> = ({ playClick }) => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const handleOpenPreview = (cert: CertificateItem) => {
    playClick();
    setSelectedCert(cert);
  };

  const handleClose = () => {
    setSelectedCert(null);
  };

  return (
    <section id="certifications" className="certifications-section section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <Award size={14} />
            <span>Verified Credentials</span>
          </div>
          <h2 className="section-title">
            Industry & University <span className="gradient-text">Certifications</span>
          </h2>
          <p className="section-subtitle">
            Formal engineering credentials and verified certifications across Autonomous AI, Cloud Data Platforms, Full-Stack MERN, C++ Data Structures, and Systems Architecture.
          </p>
        </div>

        {/* Certifications Grid */}
        <motion.div
          className="certifications-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {CERTIFICATES.map((cert) => (
            <motion.div key={cert.id} className="certificate-card" variants={fadeInUp}>
              <div>
                {/* Header */}
                <div className="certificate-header">
                  <span
                    className="cert-issuer-badge"
                    style={{ borderColor: `${cert.badgeColor}40`, color: cert.badgeColor }}
                  >
                    <CheckCircle size={12} />
                    <span>{cert.issuer}</span>
                  </span>
                  <span className="cert-date">{cert.date}</span>
                </div>

                {/* Title & Desc */}
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-desc">{cert.description}</p>

                {/* Optional Image Preview */}
                {cert.image && (
                  <div
                    className="cert-image-preview"
                    onClick={() => handleOpenPreview(cert)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleOpenPreview(cert);
                    }}
                    title="Click to view full certificate"
                  >
                    <img src={cert.image} alt={`${cert.title} preview`} loading="lazy" />
                    <div className="cert-preview-overlay">
                      <Eye size={16} />
                      <span>View Credential</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Skills Tags */}
              <div className="cert-skills-list">
                {cert.skills.map((skill) => (
                  <span key={skill} className="tech-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Fullscreen Certificate Modal */}
      <AnimatePresence>
        {selectedCert && selectedCert.image && (
          <motion.div
            className="cert-modal-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label="Certificate Preview"
          >
            <motion.div
              className="cert-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cert-modal-header">
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{selectedCert.title}</h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--accent-cyan)' }}>
                    {selectedCert.issuer} • {selectedCert.date}
                  </p>
                </div>
                <button
                  className="modal-close-btn"
                  onClick={handleClose}
                  aria-label="Close certificate preview"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="cert-modal-body">
                <img src={selectedCert.image} alt={selectedCert.title} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
