import NoteServices from '../services/NoteServices';
// import $ from 'jquery';
var dateFormat = require('dateformat');

// Get the elements with class="column"
var elements = document.getElementsByClassName("column");

// Declare a loop variable
var i;
const noteService = new NoteServices();

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

    notesInGridView() {
        for (i = 0; i < elements.length; i++) {
            elements[i].style.width = "27%";
        }
    }

    notesInListView() {
        for (i = 0; i < elements.length; i++) {
            elements[i].style.width = "70%";
        }
    }

    getToday(key, note) {
        var day = new Date();   
        var today = dateFormat(day,"mmm d, h:MM TT"); 
        note.reminder = today;
        
        noteService.onUpdateNote(key,note);
    }

    getTomorrow(key,note) {
        var day = new Date();   
        day.setDate(day.getDate()+1);
        var tomorrow = dateFormat(day,"mmm d, h:MM TT");
        note.reminder = tomorrow;

        noteService.onUpdateNote(key,note);
    }

    getNextWeek(key,note) { 
        var day = new Date();
        day.setDate(day.getDate() + (1 + 7 - day.getDay()) % 7);
        var nextMonday = dateFormat(day,"mmm d, h:MM TT");
        note.reminder = nextMonday;

        noteService.onUpdateNote(key,note);
    }

    handleDeleteReminder(key, data) {
        data.reminder = null;
        noteService.onUpdateNote(key,data);
    }

    isPinNote(key, data) {
        if( data.ispin === true) {
            data.ispin = false;
        }
        else {
            data.ispin = true;
        }
        noteService.onUpdateNote(key,data);
    }

    isArchiveNote(key, data) {
        if( data.isarchive === true) {
            data.isarchive = false;
        }
        else {
            data.isarchive = true;
        }
        noteService.onUpdateNote(key,data);
    }

    isTrashNote(key, data) {
        if( data.istrash === true) {
            data.istrash = false;
        }
        else {
            data.istrash = true;
        }
        noteService.onUpdateNote(key,data);
    }

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

    onNoteEdit(title, notedata, key, data) {
        if(title !== null || notedata !== null) {
            data = {
                title: title,
                notedata: notedata
            }
            noteService.onUpdateNote(key, data);
        }
    }

    deleteForever(key, data) { 
        noteService.deleteForever(key,data);
    }

    onDeleteShareWith(key,note) {
        note.sharenotewith = null;
        noteService.onUpdateNote(key,note);
    }

    shareNoteWith(shareWith,key,note) {
        noteService.shareNoteWith(shareWith,key,note);
    }
}

export default NoteController;