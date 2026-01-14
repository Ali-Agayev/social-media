import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';

const Admin = () => {
    const { content, updateContent, persistChanges, loading } = useContent();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    if (loading) return <div className="section text-center">Loading...</div>;

    const handleLogin = (e) => {
        e.preventDefault();
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setIsLoggedIn(true);
                } else {
                    alert(data.message);
                }
            });
    };

    const handleAddService = () => {
        const newService = {
            title: { az: 'Yeni Xidmət', en: 'New Service' },
            description: { az: '...', en: '...' }
        };
        updateContent('services', [...content.services, newService]);
    };

    const handleDeleteService = (index) => {
        if (window.confirm('Bu xidməti silmək istədiyinizə əminsiniz?')) {
            const newServices = content.services.filter((_, i) => i !== index);
            updateContent('services', newServices);
        }
    };

    const handleAddWhyMe = () => {
        const newItem = {
            title: { az: 'Yeni Səbəb', en: 'New Reason' },
            desc: { az: '...', en: '...' }
        };
        updateContent('why_choose_me.items', [...content.why_choose_me.items, newItem]);
    };

    const handleDeleteWhyMe = (index) => {
        if (window.confirm('Bu maddəni silmək istədiyinizə əminsiniz?')) {
            const newItems = content.why_choose_me.items.filter((_, i) => i !== index);
            updateContent('why_choose_me.items', newItems);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="section container" style={{ maxWidth: '400px' }}>
                <h2 className="text-center">Admin Girişi</h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="İstifadəçi adı (admin)"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="input"
                    />
                    <input
                        type="password"
                        placeholder="Şifrə (admin123)"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="input"
                    />
                    <button type="submit" className="btn btn-primary">Daxil Ol</button>
                </form>
                <style>{`
            .input { padding: 0.8rem; background: var(--surface); border: 1px solid var(--border); color: white; border-radius: 4px; }
            .flex-col { flex-direction: column; }
        `}</style>
            </div>
        );
    }

    return (
        <div className="section container">
            <div className="flex justify-between items-center mb-8 sticky-header">
                <h2>Admin Panel</h2>
                <div className="flex gap-4">
                    <a href="/" target="_blank" className="btn btn-secondary">Sayta Bax</a>
                    <button onClick={persistChanges} className="btn btn-primary">Yadda Saxla (Save)</button>
                </div>
            </div>

            <div className="grid gap-12">

                {/* Hero Section */}
                <div className="card">
                    <h3>Ana Səhifə (Hero)</h3>
                    <div className="grid gap-4 mt-4">
                        <label>Title (AZ): <input className="input w-full" value={content.home.hero.az} onChange={e => updateContent('home.hero.az', e.target.value)} /></label>
                        <label>Title (EN): <input className="input w-full" value={content.home.hero.en} onChange={e => updateContent('home.hero.en', e.target.value)} /></label>
                        <label>Subtext (AZ): <textarea className="input w-full" value={content.home.subtext.az} onChange={e => updateContent('home.subtext.az', e.target.value)} /></label>
                        <label>Subtext (EN): <textarea className="input w-full" value={content.home.subtext.en} onChange={e => updateContent('home.subtext.en', e.target.value)} /></label>
                    </div>
                </div>

                {/* Services Section */}
                <div className="card">
                    <div className="flex justify-between items-center mb-4">
                        <h3>Xidmətlər (Services)</h3>
                        <button onClick={handleAddService} className="btn btn-sm">+ Yeni Xidmət</button>
                    </div>
                    <div className="grid gap-6">
                        {content.services.map((service, index) => (
                            <div key={index} className="sub-card">
                                <div className="flex justify-between mb-2">
                                    <h4>Xidmət #{index + 1}</h4>
                                    <button onClick={() => handleDeleteService(index)} className="text-red">Sil (Delete)</button>
                                </div>
                                <div className="grid gap-2">
                                    <input className="input w-full" placeholder="Ad (AZ)" value={service.title.az} onChange={e => updateContent(`services.${index}.title.az`, e.target.value)} />
                                    <input className="input w-full" placeholder="Name (EN)" value={service.title.en} onChange={e => updateContent(`services.${index}.title.en`, e.target.value)} />
                                    <textarea className="input w-full" placeholder="Təsvir (AZ)" value={service.description.az} onChange={e => updateContent(`services.${index}.description.az`, e.target.value)} />
                                    <textarea className="input w-full" placeholder="Description (EN)" value={service.description.en} onChange={e => updateContent(`services.${index}.description.en`, e.target.value)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Me Section */}
                <div className="card">
                    <div className="flex justify-between items-center mb-4">
                        <h3>Niyə Mən? (Why Me?)</h3>
                        <button onClick={handleAddWhyMe} className="btn btn-sm">+ Yeni Səbəb</button>
                    </div>
                    <div className="grid gap-6">
                        {content.why_choose_me.items.map((item, index) => (
                            <div key={index} className="sub-card">
                                <div className="flex justify-between mb-2">
                                    <h4>Səbəb #{index + 1}</h4>
                                    <button onClick={() => handleDeleteWhyMe(index)} className="text-red">Sil (Delete)</button>
                                </div>
                                <div className="grid gap-2">
                                    <input className="input w-full" placeholder="Başlıq (AZ)" value={item.title.az} onChange={e => updateContent(`why_choose_me.items.${index}.title.az`, e.target.value)} />
                                    <input className="input w-full" placeholder="Title (EN)" value={item.title.en} onChange={e => updateContent(`why_choose_me.items.${index}.title.en`, e.target.value)} />
                                    <textarea className="input w-full" placeholder="Mətn (AZ)" value={item.desc.az} onChange={e => updateContent(`why_choose_me.items.${index}.desc.az`, e.target.value)} />
                                    <textarea className="input w-full" placeholder="Text (EN)" value={item.desc.en} onChange={e => updateContent(`why_choose_me.items.${index}.desc.en`, e.target.value)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Links */}
                <div className="card">
                    <h3>Sosial Linklər</h3>
                    <div className="flex flex-col gap-4 mt-4">
                        <label>Instagram: <input className="input w-full" value={content.social_links?.instagram || ''} onChange={(e) => updateContent('social_links.instagram', e.target.value)} /></label>
                        <label>WhatsApp: <input className="input w-full" value={content.social_links?.whatsapp || ''} onChange={(e) => updateContent('social_links.whatsapp', e.target.value)} /></label>
                    </div>
                </div>

            </div>

            <style>{`
        .mb-8 { margin-bottom: 2rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .gap-12 { gap: 3rem; }
        .gap-6 { gap: 1.5rem; }
        .card { background: var(--surface); padding: 2rem; border-radius: 8px; border: 1px solid var(--border); }
        .sub-card { background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 4px; border: 1px solid var(--border); }
        .w-full { width: 100%; margin-top: 0.5rem; }
        .input { padding: 0.8rem; background: #1a1a1a; border: 1px solid var(--border); color: white; border-radius: 4px; font-family: inherit; }
        .sticky-header { 
            position: sticky; 
            top: 0; 
            background: var(--bg); 
            z-index: 100; 
            padding: 1rem 0; 
            border-bottom: 1px solid var(--border); 
            margin-bottom: 2rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .btn-secondary { background: transparent; border: 1px solid var(--text); color: var(--text); padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; cursor: pointer; }
        .btn-sm { padding: 0.4rem 1rem; font-size: 0.9rem; background: var(--accent); color: var(--bg); font-weight: 600; border: none; border-radius: 4px; cursor: pointer; }
        .text-red { color: #ff4444; background: none; border: none; cursor: pointer; opacity: 0.8; transition: opacity 0.2s; }
        .text-red:hover { opacity: 1; text-decoration: underline; }
        textarea.input { min-height: 80px; resize: vertical; }
      `}</style>
        </div>
    );
};

export default Admin;
