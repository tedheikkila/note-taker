// dependencies: include the path package to get the correct file path for our html

const path = require('path');

// routing:

module.exports = (app) => {
  // HTML gets: handles when users "visit" a page

  // notes page
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  // homepage
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
};