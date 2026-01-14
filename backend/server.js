const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'content.json');

app.use(cors());
app.use(bodyParser.json());

// Helper to read data
const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading data:", err);
        return {};
    }
};

// Helper to write data
const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (err) {
        console.error("Error writing data:", err);
        return false;
    }
};

// GET content
app.get('/api/content', (req, res) => {
    const data = readData();
    res.json(data);
});

// POST update content
app.post('/api/content', (req, res) => {
    const newData = req.body;
    if (writeData(newData)) {
        res.json({ success: true, message: 'Content updated' });
    } else {
        res.status(500).json({ success: false, message: 'Failed to save' });
    }
});

// POST login (Simple mock)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // Hardcoded for demo
    if (username === 'admin' && password === 'admin123') {
        res.json({ success: true, token: 'mock-token-123' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
