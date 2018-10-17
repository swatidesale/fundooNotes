const noteServices = require('../services/noteServices');
const redisClient = require('redis');
var redis  = redisClient.createClient(6379,'localhost');

/**
 * Function to create a new note
 * 
 * @param {Object} req
 * @param {Object} res
*/
exports.createNewNote = function(req,res) {
    var noteData = req.body;
    noteServices.createNewNote(redis, noteData, function(err, note) {
        if(err) {
            res.json({err: err});
        }
        else {
            res.json({data: note});
        }
    });
},

/**
 * Function to display all notes
 * 
 * @param {Object} req
 * @param {Object} res
*/
exports.displayNotes = function(req,res) {
    noteServices.displayNotes(function(err, note) {
        if(err) {
            res.json({err: err});
        }
        else {
            res.json(note);
        }
    });
},

/**
 * Function to update a note
 * 
 * @param {Object} req
 * @param {Object} res
*/
exports.updateNote = function(req, res) {
    noteServices.updateNote(redis, req.params.id, req.body, function(err, note) {
        if(err) {
            res.json({err: err});
        }
        else {
            res.json({data: note});
        }
    });
},

/**
 * Function to delete a note
 * 
 * @param {Object} req
 * @param {Object} res
*/
exports.deleteNote = function(req,res) {
    noteServices.deleteNote(redis, req.params.id, req.body, function(err, note) {
        if(err) {
            res.json({err: err});
        }
        else {
            res.json({data: note});
        }
    });
},

/**
 * Function to share a note
 * 
 * @param {Object} req
 * @param {Object} res
*/
exports.shareNote = function(req,res) {
    noteServices.shareNote(req.body, function(err, note) {
        if(err) {
            res.json({err: err});
        }
        else {
            res.json({data: note});
        }
    });
}