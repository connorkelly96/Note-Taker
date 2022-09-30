// Dependecncies
const util = require("util");
const fs = require("fs");


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
      return readFileAsync("db/db.json", "utf8");
    }

    write(note) {
      return writeFileAsync("db/db.json", JSON.stringify(note));
    }

    getNotes() {
      return this.read().then(notes => {
        let parsedNotes;

        // sends notes to an empty array if they are not one
        try {
          parsedNotes = [].concat(JSON.parse(notes));
        } catch (err) {
          parsedNotes = [];
        }

        return parsedNotes;
      });
    }

    addNote(note) {
      const { title, text } = note;

      if (!title || !text) {
        throw new Error("Note 'title' and 'text' cannot be blank");
      }

      // uuid package add id to the note
 

      // Get all notes, add the new note, write all the updated notes, return the newNote
      return this.getNotes()
        .then(notes => [...notes, newNote])
        .then(updatedNotes => this.write(updatedNotes))
        .then(() => newNote);
    }

    removeNote(id) {
      // Get all notes and filteres them
      return this.getNotes()
        .then(notes => notes.filter(note => note.id !== id))
        .then(filteredNotes => this.write(filteredNotes));
    }
  }

  module.exports = new Store();