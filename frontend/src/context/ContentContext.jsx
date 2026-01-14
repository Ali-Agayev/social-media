import React, { createContext, useState, useEffect, useContext } from 'react';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load from API
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    useEffect(() => {
        fetch(`${API_URL}/api/content`)
            .then(res => res.json())
            .then(data => {
                setContent(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch content", err);
                setLoading(false);
            });
    }, []);

    // Save to API
    const saveContent = (newContent) => {
        fetch(`${API_URL}/api/content`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newContent)
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setContent(newContent);
                    alert('Yadda saxlanıldı! (Saved!)');
                } else {
                    alert('Xəta baş verdi. (Error saving)');
                }
            })
            .catch(err => alert("Error saving: " + err));
    };

    // Update local state and trigger save
    const persistChanges = () => {
        if (content) saveContent(content);
    };

    const updateContent = (path, value) => {
        setContent(prev => {
            const newData = { ...prev };
            let current = newData;
            const keys = path.split('.');

            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }

            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };

    return (
        <ContentContext.Provider value={{ content, loading, updateContent, persistChanges }}>
            {children}
        </ContentContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useContent = () => useContext(ContentContext);
