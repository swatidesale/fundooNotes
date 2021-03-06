import NoteServices from '../services/NoteServices';
import axios from 'axios';
// import $ from 'jquery';
var dateFormat = require('dateformat');

// Get the elements with class="column"
var elements = document.getElementsByClassName("column");

// Declare a loop variable
var i;
const noteService = new NoteServices();

//Class for note controller operations 
class NoteController {
    // reload() {
    //     $(document).ready(($) => {
    //         $(document).on('submit', '#submit-form', (event) => {
    //             event.preventDefault();
    //         });
    //     });

    //     $.ajax({
    //         url: "/home/notes",
    //         context: document.body,
    //         success: function(s,x) {
    //             $(this).html(s);
    //         }
    //     });

    //     $(document).ready(function() {
    //         $('#submit-form').delay(1000).load('/home/notes');
    //     });
    // }

    /**
     * Display notes in grid view
     * 
    */
    notesInGridView() {
        for (i = 0; i < elements.length; i++) {
            elements[i].style.width = "27%";
        }
    }

    /**
     * Dsipaly notes in list view
     * 
    */
    notesInListView() {
        for (i = 0; i < elements.length; i++) {
            elements[i].style.width = "70%";
        }
    }

    /**
     * function to get today's date for reminder
     * 
     * @param key
     * @param note
    */
    getToday(key, note) {
        var day = new Date();   
        var today = dateFormat(day,"mmm d, h:MM TT"); 
        note.reminder = today;
        
        noteService.onUpdateNote(key,note);
    }

    /**
     * function to get tomorrows date for reminder
     * 
     * @param key
     * @param note
    */
    getTomorrow(key,note) {
        var day = new Date();   
        day.setDate(day.getDate()+1);
        var tomorrow = dateFormat(day,"mmm d, h:MM TT");
        note.reminder = tomorrow;

        noteService.onUpdateNote(key,note);
    }

    /**
     * function to get next week's monday's date for reminder
     * 
     * @param key
     * @param note
    */
    getNextWeek(key,note) { 
        var day = new Date();
        day.setDate(day.getDate() + (1 + 7 - day.getDay()) % 7);
        var nextMonday = dateFormat(day,"mmm d, h:MM TT");
        note.reminder = nextMonday;

        noteService.onUpdateNote(key,note);
    }

    /**
     * function to delete reminder 
     * 
     * @param key
     * @param data
    */
    handleDeleteReminder(key, data) {
        data.reminder = null;
        noteService.onUpdateNote(key,data);
    }

    /**
     * function to check pin or unpin note
     * 
     * @param key
     * @param data
    */
    isPinNote(key, data) {
        if( data.ispin === true) {
            data.ispin = false;
        }
        else {
            data.ispin = true;
        }
        noteService.onUpdateNote(key,data);
    }

    /**
     * function to check archive or unarchive note
     * 
     * @param key
     * @param data
    */
    isArchiveNote(key, data) {
        if( data.isarchive === true) {
            data.isarchive = false;
        }
        else {
            data.isarchive = true;
        }
        noteService.onUpdateNote(key,data);
    }

    /**
     * function to check trash note
     * 
     * @param key
     * @param data
    */
    isTrashNote(key, data) {
        if( data.istrash === true) {
            data.istrash = false;
        }
        else {
            data.istrash = true;
        }
        noteService.onUpdateNote(key,data);
    }

    /**
     * function to change color of note
     * 
     * @param key
     * @param data
    */
    changeColor(key,note,btn) {
        if(btn === 1) {
            note.background = 'white';
        }
        else if(btn === 2) {
            note.background = 'rgb(255, 138, 128)';
        }
        else if(btn === 3) {
            note.background = 'rgb(255, 209, 128)';
        }
        else if(btn === 4) {
            note.background = 'rgb(255, 255, 141)';
        }
        else if(btn === 5) {
            note.background = 'rgb(204, 255, 144)';
        }
        else if(btn === 6) {
            note.background = 'rgb(167, 255, 235)';
        }
        else if(btn === 7) {
            note.background = 'rgb(128, 216, 255)';
        }
        else if(btn === 8) {
            note.background = 'rgb(130, 177, 255)';
        }
        else if(btn === 9) {
            note.background = 'rgb(179, 136, 255)';
        }
        else if(btn === 10) {
            note.background = 'rgb(248, 187, 208)';
        }
        else if(btn === 11) {
            note.background = 'rgb(215, 204, 200)';
        }
        else if(btn === 12) {
            note.background = 'rgb(207, 216, 220)';
        }
        else {
            note.background = 'white';
        }
        
        noteService.onUpdateNote(key,note);
    }

    /**
     * function to edit note title and note data
     * 
     * @param title
     * @param notedata
     * @param key
     * @param data
    */
    onNoteEdit(title, notedata, key, data) {
        if(title !== null || notedata !== null) {
            data = {
                notetitle: title,
                notedata: notedata
            }
            noteService.onUpdateNote(key, data);
        }
    }

    /**
     * function to delete note from database
     * 
     * @param key
     * @param data
    */
    deleteForever(key, data) { 
        noteService.deleteForever(key,data);
    }

    /**
     * function to delete shared person from note
     * 
     * @param key
     * @param note
    */
    onDeleteShareWith(key,note) {
        const sharenotewith = note.sharenotewith;
        var users = [];
        var notes = [];
        note.sharenotewith = null;
        var title = note.notetitle;
        noteService.onUpdateNote(key,note);
        axios.get('/api/users/register')
        .then(res => {
          users = res.data;
          users.forEach(function(user) {
              var userId = user._id;
              if(user.username === sharenotewith) {
                axios.get('/api/notes/notes')
                .then(res => {
                  notes = res.data;
                    notes.forEach(function(note) {
                        if(note.userId === userId && note.sharednoteby && title === note.notetitle){
                            console.log("inside....",note._id);
                            console.log(note);
                            noteService.deleteForever(note._id,note);
                        }
                    });
                });
              }
          });
      });
    }

    /**
     * function to share a note with other user
     * 
     * @param shareWith
     * @param key
     * @param note
    */
    shareNoteWith(shareWith,key,note) {
        noteService.shareNoteWith(shareWith,key,note);
    }
}

export default NoteController;