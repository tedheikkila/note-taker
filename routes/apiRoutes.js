// API routes

// require in statements
const fs = require('fs');
const path = require('path');
const notesData = require("../db/db.json");

// app features
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

    // set up id's for pushes/save events
    let idEl = 0
    for (let i = 0; i < notesData.length; i++) {
      let oneNote = notesData[i];

      if (oneNote.id > idEl) {
        idEl = oneNote.id
      }
    }

    newNote.id = idEl + 1

    // pushs new note to db
    notesData.push(newNote)

    // re-write db
    fs.writeFile(jsonPath, JSON.stringify(notesData), function (err) {
      if (err) {
        return console.log(err)
      } console.log("saved note")
    });

    // sends new note to client
    res.json(newNote)
  })

  // delete note w/specific id
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

    // re-write db file again w/specified note now removed from db
    fs.writeFileSync(jsonPath, JSON.stringify(notesData), function (err) {
      if (err) {
        return console.log(err)
      } else {
        console.log("deleted note")
      }

    });
    res.json(notesData)
  });
}