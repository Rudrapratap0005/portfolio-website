import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, CheckCircle2, MapPin, Calendar, X, Image as ImageIcon } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';
import { fadeInUp, staggerContainer, backdropVariants, modalVariants } from '../utils/motion';
import '../styles/Experience.css';

export const Experience: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="experience" className="experience-section section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <Briefcase size={14} />
            <span>Career Milestones</span>
          </div>
          <h2 className="section-title">
            Education & <span className="gradient-text">Experience Timeline</span>
          </h2>
          <p className="section-subtitle">
            My academic journey in Computer Science & Engineering and professional internship experience, building real-world full-stack applications and systems projects.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="timeline-container">
          <div className="timeline-track" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {EXPERIENCES.map((exp) => (
              <motion.div key={exp.id} className="timeline-item" variants={fadeInUp}>
                <div className={`timeline-dot ${exp.current ? 'current' : ''}`} />

                <div className="timeline-card">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-role">{exp.role}</h3>
                      <div className="timeline-company">{exp.company}</div>
                    </div>

                    <div className="timeline-meta">
                      <span className={`timeline-period-badge ${exp.current ? 'current' : ''}`}>
                        <Calendar size={12} style={{ display: 'inline', marginRight: 4 }} />
                        {exp.period}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <p className="timeline-summary">{exp.summary}</p>

                  <ul className="timeline-achievements">
                    {exp.achievements.map((item, idx) => (
                      <li key={idx} className="achievement-item">
                        <CheckCircle2 size={16} className="achievement-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="timeline-tech-stack">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Optional Image Gallery */}
                  {exp.images && exp.images.length > 0 && (
                    <div className="experience-gallery">
                      {exp.images.map((img, idx) => (
                        <div 
                          key={idx} 
                          className="experience-thumbnail"
                          onClick={() => setSelectedImage(img)}
                        >
                          <img src={img} alt={`${exp.role} gallery ${idx + 1}`} loading="lazy" />
                          <div className="thumbnail-overlay">
                            <ImageIcon size={16} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="experience-modal-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="experience-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close-btn"
                onClick={() => setSelectedImage(null)}
                aria-label="Close image preview"
              >
                <X size={24} />
              </button>
              <img src={selectedImage} alt="Experience preview full screen" className="experience-modal-image" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
