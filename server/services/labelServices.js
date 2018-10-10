//Label Model
const labelModel = require('../models/Labels');

/**
 * Service to create a new label
 * 
 * @param labelData
 * @param callback
*/
exports.createLabel = function(labelData, callback) {
    labelModel.createLabel(labelData, function(err,label) {
        if(err) {
            callback(err,null);
        }
        else {
            callback(null,label);
        }
    });
},

/**
 * Service to display all labels
 * 
 * @param callback
*/
exports.displayAllLabels = function(callback) {
    labelModel.displayAllLabels(function(err,label) {
        if(err) {
            callback(err,null);
        }
        else {
            callback(null,label);
        }
    });
},
 
/**
 * Service to update a label
 * 
 * @param id
 * @param labelData
 * @param callback
*/
exports.updateLabel = function(id, labelData, callback) {
    labelModel.updateLabel(id, labelData, function(err, label) {
        if(err) {
            callback(err,null);
        }
        else {
            callback(null,label);
        }
    });
},

/**
 * Service to delete a note
 * 
 * @param id
 * @param labelData
 * @param callback
*/
exports.deleteLabel = function(id, labelData, callback) {
    labelModel.deleteLabel(id, labelData, function(err, label) {
        if(err) {
            callback(err,null);
        }
        else {
            callback(null,label);
        }
    });
}
 
