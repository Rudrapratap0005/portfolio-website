import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Mail, MapPin } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES } from '../data/portfolioData';
import { modalVariants, backdropVariants } from '../utils/motion';
import '../styles/ResumeModal.css';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  playClick: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, playClick }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    playClick();
    window.print();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="resume-modal-backdrop"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
      >
        <motion.div
          className="resume-modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="resume-modal-header">
            <div>
              <h2 id="resume-title" style={{ fontSize: '1.4rem', fontWeight: 700 }}>
                {PERSONAL_INFO.name} — Technical Curriculum Vitae
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--accent-cyan)' }}>
                {PERSONAL_INFO.role}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className="btn btn-outline"
                style={{ padding: '6px 12px', fontSize: '0.8125rem' }}
                onClick={handlePrint}
                title="Print or Save as PDF"
              >
                <Printer size={15} />
                <span>Print PDF</span>
              </button>
              <button
                className="modal-close-btn"
                onClick={() => {
                  playClick();
                  onClose();
                }}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="resume-modal-body">
            {/* Contact line */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Mail size={14} color="#00f0ff" />
                {PERSONAL_INFO.email}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={14} color="#a855f7" />
                {PERSONAL_INFO.location}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--accent-emerald)' }}>
                Mobile: {PERSONAL_INFO.phone}
              </span>
              <a
                href="/cv/Rudra cv[1].pdf"
                download="Rudra_Pratap_Shukla_CV.pdf"
                style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}
                onClick={playClick}
              >
                Download Original PDF
              </a>
            </div>

            {/* Executive Summary */}
            <div>
              <h3 className="resume-section-title">Professional Summary</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                Computer Science & Engineering undergraduate at Lovely Professional University with hands-on experience in full-stack MERN engineering, operating systems memory management in C/C++, and AI integrations. Strong problem solver, quick learner, and certified in Oracle Agentic AI and Data Platforms.
              </p>
            </div>

            {/* Internship Experience */}
            <div>
              <h3 className="resume-section-title">Internship Experience</h3>
              {EXPERIENCES.filter((e) => e.type === 'Internship').map((exp) => (
                <div key={exp.id} className="resume-item">
                  <div className="resume-item-header">
                    <span>
                      {exp.role} — <strong style={{ color: 'var(--accent-cyan)' }}>{exp.company}</strong>
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {exp.period}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', marginBottom: 4 }}>{exp.summary}</p>
                  <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem' }}>
                    {exp.achievements.map((a, i) => (
                      <li key={i} style={{ marginBottom: 2 }}>{a}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Technical Skills */}
            <div>
              <h3 className="resume-section-title">Technical Skills</h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                <strong>Languages:</strong> C++, JavaScript, C, PHP, Python, SQL (MySQL).<br />
                <strong>Frameworks & Libraries:</strong> React.js, Vite, Node.js, Express.js, Tailwind CSS, Bootstrap, Chart.js.<br />
                <strong>Databases & Tools:</strong> MongoDB, Mongoose, MySQL, Firebase Auth, JWT, bcrypt, Git, GitHub, Render, Vercel.<br />
                <strong>Core Competencies:</strong> Operating Systems, Dynamic Memory Management, Data Structures & Algorithms, RESTful APIs.
              </p>
            </div>

            {/* Verified Certifications */}
            <div>
              <h3 className="resume-section-title">Verified Certifications</h3>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', lineHeight: 1.6 }}>
                <li><strong>Agentic AI Certified Foundations Associate</strong> — Oracle University (Jul 2026)</li>
                <li><strong>Oracle Data Platform 2025 Certified Foundations Associate</strong> — Oracle University (May 2026)</li>
                <li><strong>AI-Driven MERN Stack Bootcamp: Full Stack with DevOps</strong> — Centre for Professional Enhancement, LPU (Jul 2026)</li>
                <li><strong>C++ Programming & Data Structures and Algorithms</strong> — NeoColab (Jan 2026)</li>
                <li><strong>Certificate of Internship (Event Management)</strong> — Matrix Events & Marketing (Aug 2026)</li>
              </ul>
            </div>

            {/* Education */}
            <div>
              <h3 className="resume-section-title">Education</h3>
              {EXPERIENCES.filter((e) => e.type !== 'Internship').map((edu) => (
                <div key={edu.id} className="resume-item">
                  <div className="resume-item-header">
                    <span>
                      {edu.role} — <strong style={{ color: 'var(--accent-cyan)' }}>{edu.company}</strong>
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {edu.period}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem' }}>{edu.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
