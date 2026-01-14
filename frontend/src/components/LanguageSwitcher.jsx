import React from 'react';

const LanguageSwitcher = ({ currentLang, setLang }) => {
  return (
    <div className="language-switcher">
      <button 
        className={currentLang === 'az' ? 'active' : ''} 
        onClick={() => setLang('az')}
      >
        AZ
      </button>
      <span className="separator">/</span>
      <button 
        className={currentLang === 'en' ? 'active' : ''} 
        onClick={() => setLang('en')}
      >
        EN
      </button>

      <style>{`
        .language-switcher {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .language-switcher button {
          color: var(--text-muted);
          padding: 0;
        }
        .language-switcher button.active {
          color: var(--text);
        }
        .separator {
          color: var(--border);
        }
      `}</style>
    </div>
  );
};

export default LanguageSwitcher;
