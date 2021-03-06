//Note Model
const noteModel = require('../models/Notes');

/**
 * Service to create a new note
 * 
 * @param redis
 * @param noteData
 * @param callback
*/
exports.createNewNote = function(redis, noteData, callback) {
    noteModel.createNote(redis, noteData, function(err,note) {
        if(err) {
            callback(err,null);
        }
        else {
            callback(null,note);
        }
    });
},

/**
 * Service to display all notes
 * 
 * @param callback
*/
exports.displayNotes = function(callback) {
    noteModel.displayAllNotes(function(err,note) {
        if(err) {
            callback(err,null);
        }
        else {
            callback(null,note);
        }
    });
},

/**
 * Service to update a note
 * 
 * @param redis
 * @param id
 * @param noteData
 * @param callback
*/
exports.updateNote = function(redis, id, noteData, callback) {
    noteModel.updateNote(redis, id, noteData, function(err, note) {
        if(err) {
            callback(err,null);
        }
        else {
            callback(null,note);
        }
    });
},

/**
 * Service to delete a note
 * 
 * @param redis
 * @param id
 * @param noteData
 * @param callback
*/
exports.deleteNote = function(redis, id, noteData, callback) {
    noteModel.deleteNote(redis, id, noteData, function(err, note) {
        if(err) {
            callback(err,null);
        }
        else {
            callback(null,note);
        }
    });
},

/**
 * Service to update a note and send mail to sharewith
 * 
 * @param noteData
 * @param callback
*/
exports.shareNote = function(noteData, callback) {
    var id = noteData.key;
    noteModel.findAndUpdate(id, noteData, function(err, note) {
        if(err) {
            callback(err,null);
        }
        else {
            username = noteData.username;
            userfullname = noteData.userfullname;
            subject = 'Shared a note with you';
            text = 'Hello,\n\n' +
                userfullname + '( ' + username +' )' + 'shared a note with you.\n\n' +
                'http://localhost:3000/home/notes';

            noteModel.sendMail(noteData.sharenotewith,username, subject, text, function(err, result) {
                if(err) {
                    callback(err,null);
                }
                else if(result){
                    callback(null, result);
                }
            })
        }
    });
}


