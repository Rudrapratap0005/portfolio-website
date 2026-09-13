import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareQuote, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';
import { fadeInUp, staggerContainer } from '../utils/motion';
import '../styles/Testimonials.css';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="testimonials-section section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <MessageSquareQuote size={14} />
            <span>Executive Endorsements</span>
          </div>
          <h2 className="section-title">
            Peer & Leadership <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="section-subtitle">
            Insights and recommendations from engineering vice presidents, product directors, and principal AI researchers who have partnered on mission-critical initiatives.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          className="testimonials-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {TESTIMONIALS.map((item) => (
            <motion.div key={item.id} className="testimonial-card" variants={fadeInUp}>
              <div>
                <Quote size={28} className="quote-icon" />
                <p className="testimonial-text">&ldquo;{item.text}&rdquo;</p>
              </div>

              <div className="testimonial-author">
                <div className="author-avatar">{item.avatarText}</div>
                <div className="author-info">
                  <span className="author-name">{item.name}</span>
                  <span className="author-role">
                    {item.role} • {item.company}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
