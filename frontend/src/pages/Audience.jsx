import React from 'react';
import { useContent } from '../context/ContentContext';

const Audience = ({ lang }) => {
    const { content } = useContent();

    if (!content) return null;

    return (
        <div className="section">
            <div className="container">
                <div className="grid gap-12">

                    <div className="audience-section">
                        <h2 className="text-center">{content.who_for.title[lang]}</h2>
                        <div className="audience-list">
                            {content.who_for.list.map((item, i) => (
                                <div key={i} className="audience-item check">
                                    <span>✓</span> {item[lang]}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="audience-section not-for">
                        <h2 className="text-center muted">{content.who_not_for.title[lang]}</h2>
                        <div className="audience-list">
                            {content.who_not_for.list.map((item, i) => (
                                <div key={i} className="audience-item cross">
                                    <span>✕</span> {item[lang]}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
        .gap-12 { gap: 6rem; }
        .audience-list {
            max-width: 600px;
            margin: 2rem auto 0;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        .audience-item {
            font-size: 1.25rem;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .audience-item span {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            font-size: 0.9rem;
        }
        .check span {
            background: var(--text);
            color: var(--bg);
        }
        .cross span {
            border: 1px solid var(--border);
            color: var(--text-muted);
        }
        .not-for h2 {
            color: var(--text-muted);
        }
        .not-for .audience-item {
            color: var(--text-muted);
        }
      `}</style>
        </div>
    );
};

export default Audience;
