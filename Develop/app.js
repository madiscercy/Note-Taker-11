const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Serve static files (HTML, CSS, JS, images) from the 'public' directory
// Path.join and _dirname are all there to make the path to the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Route for the notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
    console.log("/notes");
});

app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading JSON file');
        } else {
            res.json(JSON.parse(data));
        }
    });
})

app.post('api/notes', (req, res) => {
    
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

