const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

let notes = [];

// Path.join and _dirname are all there to make the path to the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading JSON file');
        } else {
            notes = JSON.parse(data);
            res.json(notes);
        }
    });
})

app.post('/api/notes', (req, res) => {
    const noteTitle = req.body.title;
    const noteText = req.body.text;
    const noteId = notes[notes.length - 1].id + 1;
    const newNote = {
        id: noteId,
        title: noteTitle,
        text: noteText
    }
    notes.push(newNote);
    fs.writeFile('db/db.json', JSON.stringify(notes), (err) =>
    err ? console.error(err) : console.log('Success!'))
    res.json(newNote);
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

