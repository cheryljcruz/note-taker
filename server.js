const PORT = process.env.PORT || 3001;
const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();

const totalNotes = require("./db/db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// deployed heroku:  https://young-beyond-04987.herokuapp.com/
// function to delete notes

// get notes
app.get("/api/notes", (req, res) => {
  res.json(totalNotes);
});

// get html files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// function to create notes
function createNote(body, noteArr) {
    const newNote = body;
     if (!Array.isArray(noteArr))
     noteArr = [];

     if (noteArr.length === 0)
     noteArr.push(0);

     body.id = noteArr[0];
     noteArr[0]++;

    noteArr.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(noteArr, null, 2)
    );
   return newNote;
}

app.post('/api/notes', (req, res) => {
    const newNote = createNote(req.body, totalNotes);
    res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`API server now on ${PORT}!`);
});
