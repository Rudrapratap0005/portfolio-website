import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Cpu, AlertTriangle, Shield } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import type { Project } from '../types';
import { modalVariants, backdropVariants } from '../utils/motion';
import '../styles/ProjectModal.css';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  playClick: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, playClick }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        <motion.div
          className="project-modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="modal-header">
            <div className="modal-title-group">
              <h2 id="modal-project-title">{project.title}</h2>
              <p>{project.tagline}</p>
            </div>
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

          {/* Body */}
          <div className="modal-body">
            {/* Project Image Gallery */}
            {project.images && project.images.length > 0 && (
              <div className="project-modal-gallery" style={{ marginBottom: '1.5rem' }}>
                <div className="project-modal-image-container" style={{ borderRadius: '8px', overflow: 'hidden', border: `1px solid ${project.accentColor}40`, marginBottom: '0.75rem' }}>
                  <img 
                    src={project.images[activeImageIndex]} 
                    alt={`${project.title} Preview`} 
                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', maxHeight: '400px' }} 
                  />
                </div>
                {project.images.length > 1 && (
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${project.images.length}, 1fr)`, gap: '0.75rem' }}>
                    {project.images.map((img, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setActiveImageIndex(idx)}
                        style={{ 
                          borderRadius: '6px', 
                          overflow: 'hidden', 
                          border: `2px solid ${activeImageIndex === idx ? project.accentColor : 'transparent'}`, 
                          height: '80px',
                          cursor: 'pointer',
                          opacity: activeImageIndex === idx ? 1 : 0.5,
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <img src={img} alt={`${project.title} Details ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Architectural Schematic Preview */}
            <div className="architecture-schematic">
              <div className="schematic-header">
                <Cpu size={14} />
                <span>Distributed Pipeline Topology</span>
              </div>
              <div className="schematic-diagram">
                <div className="schematic-node">Client Ingress<br /><small>(Edge Proxy)</small></div>
                <div className="schematic-arrow">➔</div>
                <div className="schematic-node" style={{ borderColor: project.accentColor }}>
                  {project.title} Core<br /><small>(Zero-Copy IPC)</small>
                </div>
                <div className="schematic-arrow">➔</div>
                <div className="schematic-node">State & Memory Grid<br /><small>(Quantized KV)</small></div>
                <div className="schematic-arrow">➔</div>
                <div className="schematic-node">Telemetry & Logs<br /><small>(OpenTelemetry)</small></div>
              </div>
            </div>

            {/* Problem vs Solution Grid */}
            <div className="problem-solution-grid">
              <div className="detail-box">
                <h4>
                  <AlertTriangle size={18} color="#f59e0b" />
                  <span>The Architectural Challenge</span>
                </h4>
                <p>{project.architecture.problem}</p>
              </div>

              <div className="detail-box">
                <h4>
                  <Shield size={18} color="#10b981" />
                  <span>Engineered Solution</span>
                </h4>
                <p>{project.architecture.solution}</p>
              </div>
            </div>

            {/* System Pillars */}
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#ffffff' }}>
                Core Architecture Implementations
              </h4>
              <ul className="pillar-list">
                {project.architecture.architectureDetails.map((detail, idx) => (
                  <li key={idx} className="pillar-item">
                    <span className="pillar-bullet" style={{ background: project.accentColor }} />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Outcomes */}
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#ffffff' }}>
                Key Production Outcomes & Impact
              </h4>
              <div className="outcome-grid">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="outcome-card">
                    <div className="outcome-value" style={{ color: project.accentColor }}>
                      {metric.value}
                    </div>
                    <div className="outcome-label">{metric.label}</div>
                    {metric.change && (
                      <div style={{ fontSize: '0.7rem', color: '#10b981', marginTop: '2px' }}>
                        {metric.change}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#ffffff' }}>
                Technologies & Protocols
              </h4>
              <div className="project-tech-list">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag" style={{ color: '#ffffff' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Engineered by Rudra Pratap
            </span>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  onClick={playClick}
                >
                  <GithubIcon size={16} />
                  <span>Source Code</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-glow"
                  onClick={playClick}
                >
                  <span>Live Preview</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
