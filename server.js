const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

const express = require("express");
const app = express();

const notes = require('./develop/db/db.json')

app.get('/api/notes', (req,res) => {
    res.json(notes);
});

app.listen(PORT, () => {
  console.log(`API server now on ${PORT}!`);
});
