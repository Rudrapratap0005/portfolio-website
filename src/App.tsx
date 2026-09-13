import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AmbientMesh } from './components/AmbientMesh';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { ResumeModal } from './components/ResumeModal';
import { Certifications } from './components/Certifications';
import { useSoundEffects } from './hooks/useSoundEffects';
import { PROJECTS } from './data/portfolioData';
import type { Project } from './types';

export const App: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const {
    soundEnabled,
    toggleSound,
    playClick,
    playModalOpen,
    playSuccess,
  } = useSoundEffects();

  // Global keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        playClick();
        setIsCmdOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playClick]);

  const handleOpenProject = (id: string) => {
    setSelectedProjectId(id);
    playModalOpen();
  };

  const handleCloseProject = () => {
    setSelectedProjectId(null);
  };

  const handleOpenResume = () => {
    setIsResumeOpen(true);
    playModalOpen();
  };

  const selectedProject: Project | null =
    PROJECTS.find((p) => p.id === selectedProjectId) || null;

  return (
    <>
      {/* Skip to Content for A11y */}
      <a
        href="#main-content"
        className="sr-only"
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 9999,
          background: '#00f0ff',
          color: '#000000',
          padding: '8px 16px',
          borderRadius: '4px',
          fontWeight: 'bold',
        }}
      >
        Skip to main content
      </a>

      {/* Interactive Ambient Canvas Mesh */}
      <AmbientMesh theme={theme} />

      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenCommandPalette={() => setIsCmdOpen(true)}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
        playClick={playClick}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero
          playClick={playClick}
          onOpenResumeModal={handleOpenResume}
        />
        <Projects
          onOpenProject={handleOpenProject}
          playClick={playClick}
        />
        <Skills playClick={playClick} />
        <Certifications playClick={playClick} />
        <Experience />
        <Contact
          playClick={playClick}
          playSuccess={playSuccess}
        />
      </main>

      {/* Footer */}
      <Footer playClick={playClick} />

      {/* Command Palette Modal (Cmd+K) */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onOpenProject={handleOpenProject}
        onOpenResumeModal={handleOpenResume}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
        playClick={playClick}
      />

      {/* Project Architecture Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={handleCloseProject}
        playClick={playClick}
      />

      {/* Resume & Technical Credentials Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        playClick={playClick}
      />
    </>
  );
};

export default App;
