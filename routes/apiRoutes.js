// loading in json data; linking routes to data source

const fs = require('fs');
const path = require('path');

module.exports = app => {

  // setup notes var
  fs.readFile('db/db.json', "utf8", (err, data) => {

    if (err) throw err;

    // store data of db.json file in notes
    let notes = JSON.parse(data);

    app.get("/api/notes", function (req, res) {
      // read db.json file and return saved notes as json 
      res.json(notes);
    });

    // post to api/notes
    app.post("/api/notes", function (req, res) {
      // receives new note, adds it to db.json, then returns new note
      let newNote = req.body;
      notes.push(newNote);
      updateNotes();
      return console.log("added: " + newNote.title);
    });

    // retrieves note with specific id
    app.get("/api/notes/:id", function (req, res) {
      // display json for the notes array indices for provided id
      res.json(notes[req.params.id]);
    });

    // deletes a note for an id
    app.delete("/api/notes/:id", function (req, res) {
      notes.splice(req.params.id, 1);
      updateNotes();
      console.log("deleted note: " + req.params.id);
    });

    // updates json file when a note is added or deleted
    function updateNotes() {
      fs.writeFile("db/db.json", JSON.stringify(notes), err => {
        if (err) throw err;
        return true;
      });
    }

  });

}
