import React from 'react';
import { useContent } from '../context/ContentContext';

const Services = ({ lang }) => {
  const { content } = useContent();

  if (!content) return null;

  return (
    <div className="section">
      <div className="container">
        <h2 className="text-center">{lang === 'az' ? 'Xidmətlər' : 'Services'}</h2>

        <div className="services-grid">
          {content.services.map((service, index) => (
            <div key={index} className="service-card">
              <h3>{service.title[lang]}</h3>
              <p>{service.description[lang]}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
        }
        .service-card {
          background: var(--surface);
          padding: 2rem;
          border-radius: 8px;
          border: 1px solid var(--border);
          transition: transform 0.3s ease;
        }
        .service-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent);
        }
        .service-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .service-card p {
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};

export default Services;
