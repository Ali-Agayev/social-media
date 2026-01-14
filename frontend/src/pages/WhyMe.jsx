import React from 'react';
import { useContent } from '../context/ContentContext';

const WhyMe = ({ lang }) => {
  const { content } = useContent();

  if (!content) return null;

  const t = content.why_choose_me;

  return (
    <div className="section">
      <div className="container">
        <h2 className="text-center">{t.title[lang]}</h2>

        <div className="features-list">
          {t.items.map((item, index) => (
            <div key={index} className="feature-item">
              <span className="feature-number">0{index + 1}</span>
              <div className="feature-content">
                <h3>{item.title[lang]}</h3>
                <p>{item.desc[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .features-list {
          max-width: 800px;
          margin: 4rem auto 0;
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }
        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border);
        }
        .feature-item:last-child {
          border-bottom: none;
        }
        .feature-number {
          font-family: monospace;
          font-size: 1.5rem;
          color: var(--text-muted);
        }
        .feature-item h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .feature-item p {
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};

export default WhyMe;
