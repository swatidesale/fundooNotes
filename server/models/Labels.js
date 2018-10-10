const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Label Model Schema
const LabelSchema = new Schema({
    newlabel: {
        type:String
    },
    userId: {
        type: String
    }
});

var Label = mongoose.model('Label',LabelSchema);

function labelOperations() {

}

/**
 * api to create a new label
 * 
 * @param labelData
 * @param callback
*/
labelOperations.prototype.createLabel = function(labelData, callback) {
    var newLabel = new Label({
        'newlabel': labelData.newlabel,
        'userId': labelData.userId
    });

    newLabel.save(function(err, label) {
        if(err) {
            callback(err, null);
        }
        else {
            callback(null,label);
        }
    });
},


/**
 * api to display all labels
 * 
 * @param callback
*/
labelOperations.prototype.displayAllLabels = function(callback) {
    Label.find(function(err,label) {
        if(err) {
            callback(err,null);
        }
        else {
            callback(null,label);
        }
    });
},

/**
 * api to update a label
 * 
 * @param id
 * @param labelData
 * @param callback
*/
labelOperations.prototype.updateLabel = function(id, labelData, callback) {
    Label.findByIdAndUpdate(id, labelData, function(err, label) {
        if(err) {
            callback(err,null);
        }
        else {
            callback(null,label);
        }
    });
},

/**
 * api to delete a label
 * 
 * @param id
 * @param labelData
 * @param callback
*/
labelOperations.prototype.deleteLabel = function(id, labelData, callback) {
    Label.findByIdAndRemove(id, labelData, function(err, label) {
        if(err) {
            callback(err,null);
        }
        else {
            callback(null,label);
        }
    });
}

module.exports = new labelOperations;