import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  FolderGit2,
  Terminal,
  Cpu,
  Mail,
  Volume2,
  VolumeX,
  FileText,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { modalVariants, backdropVariants } from '../utils/motion';
import '../styles/CommandPalette.css';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProject: (projectId: string) => void;
  onOpenResumeModal: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  playClick: () => void;
}

interface PaletteAction {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenProject,
  onOpenResumeModal,
  soundEnabled,
  toggleSound,
  playClick,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    onClose();
    playClick();
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    onClose();
    playClick();
    alert('Email copied to clipboard: ' + PERSONAL_INFO.email);
  };

  // Build items
  const allActions: PaletteAction[] = [
    // Sections
    {
      id: 'sec-overview',
      title: 'Navigate to Overview (Hero)',
      category: 'Navigation',
      icon: <Terminal size={16} />,
      action: () => scrollToSection('hero'),
    },
    {
      id: 'sec-projects',
      title: 'Navigate to Case Studies & Projects',
      category: 'Navigation',
      icon: <FolderGit2 size={16} />,
      action: () => scrollToSection('projects'),
    },
    {
      id: 'sec-skills',
      title: 'Navigate to Architecture & Skills Matrix',
      category: 'Navigation',
      icon: <Cpu size={16} />,
      action: () => scrollToSection('skills'),
    },
    {
      id: 'sec-experience',
      title: 'Navigate to Career Journey',
      category: 'Navigation',
      icon: <Layers size={16} />,
      action: () => scrollToSection('experience'),
    },
    {
      id: 'sec-contact',
      title: 'Navigate to Initiate Contact',
      category: 'Navigation',
      icon: <Mail size={16} />,
      action: () => scrollToSection('contact'),
    },

    // Projects
    ...PROJECTS.map((p) => ({
      id: `proj-${p.id}`,
      title: `Case Study: ${p.title} (${p.tagline})`,
      category: 'Case Studies',
      icon: <Sparkles size={16} color={p.accentColor} />,
      action: () => {
        onClose();
        playClick();
        onOpenProject(p.id);
      },
    })),

    // Quick Actions
    {
      id: 'act-copy-email',
      title: `Copy Email (${PERSONAL_INFO.email})`,
      category: 'Quick Action',
      icon: <Mail size={16} />,
      action: copyEmail,
    },
    {
      id: 'act-view-resume',
      title: 'Preview Technical Resume & Credentials',
      category: 'Quick Action',
      icon: <FileText size={16} />,
      action: () => {
        onClose();
        playClick();
        onOpenResumeModal();
      },
    },
    {
      id: 'act-toggle-audio',
      title: soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects',
      category: 'Preferences',
      icon: soundEnabled ? <VolumeX size={16} /> : <Volume2 size={16} />,
      action: () => {
        toggleSound();
        playClick();
      },
    },
    {
      id: 'act-github',
      title: 'Open GitHub Profile',
      category: 'Social',
      icon: <ExternalLink size={16} />,
      action: () => {
        window.open(PERSONAL_INFO.socials.github, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
  ];

  const filteredActions = allActions.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredActions.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev <= 0 ? (filteredActions.length - 1 || 0) : prev - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cmd-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette dialog"
        >
          <motion.div
            className="cmd-dialog"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="cmd-input-wrapper">
              <Search size={18} color="#00f0ff" />
              <input
                ref={inputRef}
                className="cmd-input"
                placeholder="Type a command, project name, or section..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                aria-label="Search commands"
              />
              <span className="cmd-kbd">ESC to exit</span>
            </div>

            {/* List */}
            <ul className="cmd-list" role="listbox">
              {filteredActions.length > 0 ? (
                filteredActions.map((item, idx) => (
                  <li
                    key={item.id}
                    className={`cmd-item ${idx === selectedIndex ? 'selected' : ''}`}
                    onClick={() => item.action()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    role="option"
                    aria-selected={idx === selectedIndex}
                  >
                    <div className="cmd-item-left">
                      <div className="cmd-item-icon">{item.icon}</div>
                      <span className="cmd-item-title">{item.title}</span>
                    </div>
                    <span className="cmd-item-category">{item.category}</span>
                  </li>
                ))
              ) : (
                <div className="cmd-empty">No results found for &ldquo;{query}&rdquo;</div>
              )}
            </ul>

            {/* Footer */}
            <div className="cmd-footer">
              <div className="cmd-shortcuts">
                <span className="cmd-shortcut-item">
                  <kbd className="cmd-kbd">↑↓</kbd> to navigate
                </span>
                <span className="cmd-shortcut-item">
                  <kbd className="cmd-kbd">↵</kbd> to select
                </span>
              </div>
              <div>Rudra Pratap Portfolio Navigation</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
