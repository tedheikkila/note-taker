// loading in data; linking routes to data sources; sources hold notes

let notesData = require('../db/db.json');
// use jsonfile npm to add readable format and potentially unique id
let jsonfile = require('jsonfile')
const fs = require('fs')


// routing
module.exports = (app) => {
  // API gets; (ex: localhost:PORT/api/notes...user shown a JSON of data in table)
  app.get('/api/notes', (req, res) => res.json(notesData));

  // API posts; handles when a user submits a form and thus submits data to the server
  // need a specific npm package to give each push a unique id and push to db.json file
  app.post('/api/notes', (req, res) => {
    if (notesData.length < 100) {

      console.log(req.body);

      let id = Math.floor((Math.random()*100)+1);
      let title = req.body.title;
      let description = req.body.description;
      let note = {"Id": id, "Title": title, "Description": description};
      
      fs.readFile('db.json','utf8', function(err,notesData){
        let obj = JSON.parse(notesData);
        obj.push(note);
        let noteString = JSON.stringify(obj);
        //jsonfile.writeFile('db.json, noteString, {spaces:2}, function...)
        fs.writeFile('db.json', noteString, function(err){
            if(err) return console.log(err);
            console.log('note added to db.json file');
        });

      })

      res.json(true);

    } else {
      res.json(false);
    }
  });


  // delete data (do last)
  app.delete('/api/notes/:id', (req, res) => {
    // empties out the id's content (reads all db, remove id, rewrite to db file)
    // something like notesData.id.length = 0
    notesData.length = 0;

    res.json({ ok: true });
  });
}











  




