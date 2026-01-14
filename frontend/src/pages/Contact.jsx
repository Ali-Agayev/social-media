import React from 'react';
import { useContent } from '../context/ContentContext';

const Contact = ({ lang }) => {
    const { content } = useContent();

    if (!content) return null;

    const t = content.contact;
    const links = content.social_links || {}; // Fallback for links

    return (
        <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
            <div className="container text-center">
                <h2>{t.title[lang]}</h2>
                <p className="cta-text">{t.cta[lang]}</p>

                <div className="flex flex-col items-center gap-4">
                    <div className="btn-group">
                        <a href={`mailto:${t.email}`} className="btn btn-primary">
                            {t.button_text[lang]}
                        </a>
                    </div>

                    <div className="social-links flex gap-4 mt-4">
                        {links.instagram && (
                            <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                                Instagram
                            </a>
                        )}
                        {links.whatsapp && (
                            <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="social-link">
                                WhatsApp
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        .cta-text {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            color: var(--text-muted);
        }
      `}</style>
        </div>
    );
};

export default Contact;
