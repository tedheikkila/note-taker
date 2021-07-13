// loading in data; linking routes to data sources; sources hold notes

const notesData = require('../db/db.json');

// routing

module.exports = (app) => {
  // API gets; (ex: localhost:PORT/api/notes...user shown a JSON of data in table)
  app.get('/api/notes', (req, res) => res.json(notesData));

  // API posts; handles when a user submits a form and thus submits data to the server
  // need a specific npm package to give each push a unique id and push to db.json file
  app.post('/api/notes', (req, res) => {
    if (notesData.length < 100) {
      notesData.push(req.body);
      res.json(true);




    } else {
      res.json(false);
    }
  });


  // delete data (do last)
  app.delete('/api/notes/:id', (req, res) => {
    // empties out the id's content (reads all db, remove id, rewrite to db file)
    // something like notesData.id.length = 0 for end product
    notesData.length = 0;

    res.json({ ok: true });
  });
}









  




