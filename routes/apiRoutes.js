// loading in json data; linking routes to data source

const fs = require('fs');
const path = require('path');
const notesData = require("../db/db.json");

module.exports = app => {

  // get API endpoint
  app.get('/api/notes', function (req, res) {
    // sends db to client
    res.json(notesData)
  })

  // post API endpoint
  app.post('/api/notes', function (req, res) {
    let jsonPath = path.join(__dirname, "../db/db.json");
    let newNote = req.body;

    // setting up id's for pushes/save events
    let idEl = 0
    for (let i = 0; i < notesData.length; i++) {
      let oneNote = notesData[i];

      if (oneNote.id > idEl) {
        idEl = oneNote.id
      }
    }

    newNote.id = idEl + 1

    // pushes new note to db
    notesData.push(newNote)

    // re-writes the db
    fs.writeFile(jsonPath, JSON.stringify(notesData), function (err) {
      if (err) {
        return console.log(err)
      } console.log("note saved")
    });

    // sends to new note to browser
    res.json(newNote)
  })

  // delete a note w/specific id
  app.delete('/api/notes/:id', function (req, res) {
      let jsonPath = path.join(__dirname, "../db/db.json")
      
      //splices out note from array of objects when db id = param id
      for (let i = 0; i < notesData.length; i++) {
        // finding id match
        let target = notesData[i].id
        if (target == req.params.id) {

        notesData.splice(i, 1);
        break;
        }
      }

      // re-write db file again w/ note now removed from db
      fs.writeFileSync(jsonPath, JSON.stringify(notesData), function (err) {
        if(err) {
          return console.log(err)
        } else {
          console.log("note deleted")
        }

      });
      res.json(notesData)
  });
}
