// loading in data; linking routes to data sources; sources hold notes

const notesData = require('../db/db.json');

// routing

module.exports = (app) => {
  // API gets; (ex: localhost:PORT/api/notes...user shown a JSON of data in table)
  app.get('/api/notes', (req, res) => res.json(notesData));

  // API posts; handles when a user submits a form and thus submits data to the server
  app.post('/api/notes', (req, res) => {
    if (notesData.length < 100) {
      notesData.push(req.body);
      res.json(true);
    } else {
      res.json(false);
    }
  });


  // delete data
  app.post('/api/clear', (req, res) => {
    // empties out the arrays of data
    notesData.length = 0;

    res.json({ ok: true });
  });
};