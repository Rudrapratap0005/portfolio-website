import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Layout, Network, Sparkles, ShieldCheck, Zap, Server, Lock, Layers } from 'lucide-react';
import { SKILL_GROUPS } from '../data/portfolioData';
import { fadeInUp, staggerContainer } from '../utils/motion';
import '../styles/Skills.css';

interface SkillsProps {
  playClick: () => void;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Cpu':
      return <Cpu size={22} />;
    case 'Layout':
      return <Layout size={22} />;
    case 'Network':
      return <Network size={22} />;
    case 'Sparkles':
      return <Sparkles size={22} />;
    case 'ShieldCheck':
      return <ShieldCheck size={22} />;
    default:
      return <Cpu size={22} />;
  }
};

export const Skills: React.FC<SkillsProps> = () => {
  const principles = [
    {
      title: 'Clean Architecture',
      text: 'Designing modular, maintainable codebases with separation of concerns, RESTful APIs, and component-driven development.',
      icon: <Zap size={16} />,
    },
    {
      title: 'Memory Management',
      text: 'Understanding heap allocation, pointer arithmetic, memory pools, and custom allocators through hands-on C/C++ systems programming.',
      icon: <Server size={16} />,
    },
    {
      title: 'Secure Authentication',
      text: 'Implementing JWT tokens, bcrypt password hashing, Firebase Auth, and role-based access control in production MERN applications.',
      icon: <Lock size={16} />,
    },
    {
      title: 'Full-Stack Delivery',
      text: 'End-to-end ownership from database schemas and API design to responsive React frontends deployed on Vercel and Render.',
      icon: <Layers size={16} />,
    },
  ];

  return (
    <section id="skills" className="skills-section section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <Cpu size={14} />
            <span>Technical Mastery</span>
          </div>
          <h2 className="section-title">
            Architecture & <span className="gradient-text">Skills Matrix</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive overview of programming languages, frameworks, databases, and core CS concepts developed through hands-on project engineering and academic coursework.
          </p>
        </div>

        {/* Categories Grid */}
        <motion.div
          className="skills-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {SKILL_GROUPS.map((group) => (
            <motion.div key={group.id} className="skill-category-card" variants={fadeInUp}>
              <div className="category-header">
                <div className="category-icon-box">{getCategoryIcon(group.icon)}</div>
                <h3 className="category-title">{group.category}</h3>
              </div>
              <p className="category-desc">{group.description}</p>

              <div className="skills-list">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="skill-row">
                    <div className="skill-info">
                      <span className="skill-name">
                        {skill.highlight && <span className="skill-highlight-dot" title="Core Specialty" />}
                        <span>{skill.name}</span>
                      </span>
                      <span className="skill-exp" style={{
                        fontSize: '0.7rem',
                        padding: '4px 8px',
                        background: 'var(--bg-glass-card)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '4px',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                      }}>
                        {skill.proficiency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Architectural Principles Banner */}
        <motion.div
          className="principles-banner"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {principles.map((p, idx) => (
            <div key={idx} className="principle-item">
              <div className="principle-title">
                {p.icon}
                <span>{p.title}</span>
              </div>
              <p className="principle-text">{p.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
