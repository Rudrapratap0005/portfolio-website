import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { PROJECTS } from '../data/portfolioData';
import type { Project, ProjectCategory } from '../types';
import { fadeInUp, staggerContainer } from '../utils/motion';
import '../styles/Projects.css';

interface ProjectsProps {
  onOpenProject: (projectId: string) => void;
  playClick: () => void;
}

// Individual 3D tilt card component
const ProjectCard: React.FC<{
  project: Project;
  onOpen: () => void;
  playClick: () => void;
}> = ({ project, onOpen, playClick }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transformStyle, setTransformStyle] = useState<string>('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      className="project-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="project-card-inner"
        style={{
          transform: transformStyle,
          borderTopColor: project.accentColor,
        }}
      >
        <div>
          {/* Header */}
          <div className="project-card-header">
            <span
              className="project-category-badge"
              style={{ color: project.accentColor, borderColor: `${project.accentColor}40` }}
            >
              {project.category.replace('-', ' ')}
            </span>
            <span className="project-year">{project.year}</span>
          </div>

          {/* Title & Tagline */}
          <h3 className="project-title">{project.title}</h3>
          <p className="project-tagline">{project.tagline}</p>
          <p className="project-summary">{project.summary}</p>

          {/* Key Metrics */}
          <div className="project-metrics-row">
            {project.metrics.map((m, i) => (
              <div key={i} className="metric-item">
                <span className="metric-value" style={{ color: project.accentColor }}>
                  {m.value}
                </span>
                <span className="metric-label">{m.label}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="project-tech-list">
            {project.technologies.slice(0, 5).map((t) => (
              <span key={t} className="tech-tag">
                {t}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="tech-tag">+{project.technologies.length - 5} more</span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="project-card-actions">
          <button
            className="btn-dive"
            onClick={() => {
              playClick();
              onOpen();
            }}
          >
            <span>Deep Dive Architecture</span>
            <ArrowRight size={16} />
          </button>

          <div className="project-external-links">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
                title="View Source Code"
                onClick={playClick}
                aria-label={`${project.title} GitHub repository`}
              >
                <GithubIcon size={16} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
                title="Live Demonstration"
                onClick={playClick}
                aria-label={`${project.title} live demo`}
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Projects: React.FC<ProjectsProps> = ({ onOpenProject, playClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack-mern', label: 'MERN Stack' },
    { id: 'systems-c', label: 'Systems & C/C++' },
    { id: 'ai-ml', label: 'AI & Agriculture' },
    { id: 'frontend-web', label: 'Frontend & UI' },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="projects" className="projects-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <Sparkles size={14} />
            <span>Production & Systems Code</span>
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Engineering Projects</span>
          </h2>
          <p className="section-subtitle">
            A portfolio of real-time memory management simulators, full-stack MERN applications, and AI-powered agricultural platforms built with clean code and modern tooling.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs" role="tablist" aria-label="Project categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={selectedCategory === cat.id}
              className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => {
                playClick();
                setSelectedCategory(cat.id);
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <motion.div
          className="projects-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          key={selectedCategory}
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={fadeInUp}>
              <ProjectCard
                project={project}
                onOpen={() => onOpenProject(project.id)}
                playClick={playClick}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
