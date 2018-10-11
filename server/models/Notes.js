const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var nodemailer = require('nodemailer');

//Create Note Schema
const NoteSchema = new Schema({
    notetitle: {
        type: String
    },
    notedata: {
        type: String
    },
    ispin: {
        type: Boolean,
        default: false
    },
    istrash: {
        type: Boolean,
        default: false
    },
    isarchive: {
        type: Boolean,
        default: false
    },
    background: {
        type: String
    },
    reminder: {
        type: String
    },
    userId: {
        type: String
    },
    label: {
        type: String
    },
    image: {
        type: String
    },
    sharenotewith: {
        type: String
    },
    sharednoteby: {
        type: String
    },
    sharedperson: {
        type: String
    }
});

var Note = mongoose.model('Note',NoteSchema);

function noteOperations() {

}

/*----- Save Note -----*/
/**
 * api to create a new note
 * 
 * @param noteData
 * @param callback
*/
noteOperations.prototype.createNote = function(noteData, callback) {
    var newNote = new Note({
        'notetitle': noteData.notetitle,
        'notedata': noteData.notedata,
        'userId': noteData.userId,
        'ispin': noteData.ispin,
        'istrash': noteData.istrash,
        'isarchive': noteData.isarchive,
        'background': noteData.background,
        'reminder': noteData.reminder,
        'label': noteData.label,
        'image': noteData.image,
        'sharenotewith': noteData.sharenotewith,
        'sharednoteby': noteData.sharednoteby,
        'sharedperson': noteData.sharedperson
    });

    newNote.save(function(err, note) {
        if(err) {
            callback(err, null);
        }
        else {
            callback(null,note);
        }
    });
},

/**
 * api to display all notes
 * 
 * @param callback
*/
noteOperations.prototype.displayAllNotes = function(callback) {
    Note.find(function(err,note) {
        if(err) {
            callback(err,null);
        }
        else {
            callback(null,note);
        }
    });
},

/**
 * api to update a note
 * 
 * @param id
 * @param noteData
 * @param callback
*/
noteOperations.prototype.updateNote = function(id, noteData, callback) {
    Note.findByIdAndUpdate(id, noteData, function(err, note) {
        if(err) {
            callback(err,null);
        }
        else {
            callback(null,note);
        }
    });
},

/**
 * api to delete a note
 * 
 * @param id
 * @param noteData
 * @param callback
*/
noteOperations.prototype.deleteNote = function(id, noteData, callback) {
    Note.findByIdAndRemove(id, noteData, function(err, note) {
        if(err) {
            callback(err,null);
        }
        else {
            callback(null,note);
        }
    });
},

/**
 * api to find and update a note
 * 
 * @param id
 * @param noteData
 * @param callback
*/
noteOperations.prototype.findAndUpdate = function(id, noteData, callback) {
    Note.findOne({ _id: id}, function(err, note) {
        if (!Note) {
            callback(err,null);
        }

        note.sharenotewith = noteData.sharenotewith;

        note.save(function(err,note) {
            if(err) {
                callback(err,null)
            }
            else {
                callback(null,note);
            }
        });
    });
},

/**
 * api to send a mail on share a note
 * 
 * @param id
 * @param noteData
 * @param callback
*/
noteOperations.prototype.sendMail = function(username, from, subject, text, callback) {
    var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sadesale94@gmail.com',
            pass: 'Sdesale25#' 
        }
    });
    var mailOptions = {
        to: username,
        from: from,
        subject: subject,
        text: text
    };
    smtpTransport.sendMail(mailOptions, function(err,result) {
        if(err) {
            callback(err,null);
        }
        else {
            result = true;
            callback(null,result);
        }
    });
},

module.exports = new noteOperations;