import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useContent } from '../context/ContentContext';

const Layout = ({ lang, setLang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { content } = useContent();

  if (!content) return <div className="flex items-center justify-center p-8">Loading...</div>;

  const navLinks = [
    { path: '/', label: { az: 'Ana Səhifə', en: 'Home' } },
    { path: '/services', label: { az: 'Xidmətlər', en: 'Services' } },
    { path: '/why-me', label: { az: 'Niyə Mən?', en: 'Why Me?' } },
    { path: '/audience', label: { az: 'Kimlər Üçün?', en: 'For Whom?' } },
    { path: '/contact', label: { az: 'Əlaqə', en: 'Contact' } },
  ];

  return (
    <div className="start-layout">
      <header className="header">
        <div className="container flex items-center justify-between" style={{ height: '100%' }}>
          <Link to="/" className="logo">AYGUN.</Link>

          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label[lang]}
              </Link>
            ))}
          </nav>

          <div className="actions flex items-center gap-4">
            <LanguageSwitcher currentLang={lang} setLang={setLang} />
            <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer section">
        <div className="container text-center">
          <p className="copyright">© 2026 Aygun. {lang === 'az' ? 'Bütün hüquqlar qorunur.' : 'All rights reserved.'}</p>
        </div>
      </footer>

      <style>{`
        .header {
          height: var(--header-height);
          border-bottom: 1px solid var(--surface);
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: rgba(10, 10, 10, 0.8);
          backdrop-filter: blur(10px);
          z-index: 1000;
        }
        .logo {
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: -0.05em;
        }
        .nav {
          display: flex;
          gap: 2rem;
        }
        .nav-link {
          font-size: 0.9rem;
          color: var(--text-muted);
          position: relative;
        }
        .nav-link.active, .nav-link:hover {
          color: var(--text);
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--accent);
        }
        .menu-toggle {
          display: none;
          font-size: 1.5rem;
          color: var(--text);
        }
        .copyright {
          color: var(--text-muted);
          font-size: 0.8rem;
        }
        
        @media (max-width: 768px) {
          .nav {
            position: fixed;
            top: var(--header-height);
            left: 0;
            width: 100%;
            height: calc(100vh - var(--header-height));
            background: var(--bg);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transform: translateX(100%);
            transition: transform 0.3s ease;
          }
          .nav.open {
            transform: translateX(0);
          }
          .menu-toggle {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
