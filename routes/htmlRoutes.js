// HTML routes

// require statements
const path = require('path');

// app features:
module.exports = (app) => {

  // notes page
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  // homepage
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
};