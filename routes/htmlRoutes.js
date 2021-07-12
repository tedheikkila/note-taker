// dependencies: include the path package to get the correct file path for our html

const path = require('path');

// routing:

module.exports = (app) => {
  // HTML gets: handles when users "visit" a page

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  // gets user to to home
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
};