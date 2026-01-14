import React from 'react';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';

const Home = ({ lang }) => {
  const { content } = useContent();

  if (!content) return <div className="section text-center">Loading...</div>;

  const t = content.home;

  return (
    <div className="home-page section flex items-center justify-center" style={{ minHeight: '80vh' }}>
      <div className="container text-center">
        <h1 className="hero-title">{t.hero[lang]}</h1>
        <p className="hero-subtext">{t.subtext[lang]}</p>
        <div className="mt-8">
          <Link to="/contact" className="btn btn-primary">
            {content.contact.button_text[lang] || "Contact"}
          </Link>
        </div>
      </div>

      <style>{`
        .hero-title {
          font-size: 4rem;
          margin-bottom: 2rem;
          line-height: 1.1;
          background: linear-gradient(to right, #fff, #a1a1aa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtext {
          font-size: 1.25rem;
          color: var(--text-muted);
          max-width: 600px;
          margin: 0 auto 3rem;
        }
        .mt-8 { margin-top: 2rem; }
        
        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  );
};

export default Home;
